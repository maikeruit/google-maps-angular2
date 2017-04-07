# google-maps-angular2
Google Maps Api for Angular2

## Installation

```sh
npm install --save google-maps-angular2
```

### SystemJS configuration

Adapt your `systemjs.config.js` (or another place where you configure SystemJS) file with the following:
during...

## Usage

First, import `GoogleMapsModule` into the angular module where you want to use it:

```typescript
imports: [
  ...
    GoogleMapsModule.forRoot({
            API_KEY: 'YouR-Api-Key',
            libraries: ['places'] // libraries
        })
  ...
]
```
Insert into html component page

```html
<input style="z-index: 40; padding: 10px;" type="text" placeholder="Search..." #search>
<div id="googlemap" style="width: 100%; heigth: 400px;" #map></div>
```

## Component configuration

```typescript
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMapsService} from 'google-maps-angular2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('map') map: ElementRef;
    @ViewChild('search') search: ElementRef;

    constructor(private api: GoogleMapsService) {}

    ngAfterViewInit(): void {
        this.api.init.then(maps => {
            const loc = new maps.LatLng(55.81800989, 49.09815408);

            this.api.map = new maps.Map(this.map.nativeElement, {
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

            const input = this.search.nativeElement;
            const options = {
                componentRestrictions: {country: 'ru'}
            };

            const autocomplete = new maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const location = place.geometry.location;

                this.api.map.filter(map => map).subscribe(m => {
                    m.setZoom(13);
                    m.setCenter({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                });
            });
        });
    }
}
```
