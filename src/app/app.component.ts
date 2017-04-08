import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMapsService} from './google-maps.service';

@Component({
    selector: 'app-root',
    template: `
      <input type="text" class="input" placeholder="Поиск..." #inputElement>
      <div class="map" #mapElement></div>
    `,
})
export class AppComponent implements AfterViewInit {
    @ViewChild('mapElement') mapElement: ElementRef;
    @ViewChild('inputElement') inputElement: ElementRef;

    private map: any;

    constructor(private gapi: GoogleMapsService) {
    }

    ngAfterViewInit(): void {
        /**
         * Init map api [google.maps]
         */
        this.gapi.init.then((maps: any) => {
            const loc = new maps.LatLng(55.81800989, 49.09815408);

            this.map = new maps.Map(this.mapElement.nativeElement, {
                zoom: 13,
                center: loc,
                scrollwheel: false,
                panControl: false,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                scaleControl: true,
                zoomControlOptions: {
                    style: maps.ZoomControlStyle.LARGE,
                    position: maps.ControlPosition.RIGHT_BOTTOM
                }
            });

            const input = this.inputElement.nativeElement;
            const options = {
                componentRestrictions: {country: 'ru'}
            };

            const autocomplete = new maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const location = place.geometry.location;

                this.map.setZoom(13);
                this.map.setCenter({
                    lat: location.lat(),
                    lng: location.lng()
                });
            });
        });
    }
}
