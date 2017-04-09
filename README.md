# google-maps-angular2
Google Maps Api for Angular2

The library provides access to the google maps api.

Google Maps Api examples: <a href="https://developers.google.com/maps/documentation/javascript/examples/">Link</a>

## Demo

<a href="https://youtu.be/fwcnSB6PF-A" target="_blank">Video demonstation</a><br>
<a href="https://embed.plnkr.co/6Vn4p8c0W7SYiLZzQcoD/">Plunker Demo</a>

## Installation

```sh
npm install --save google-maps-angular2
```

### SystemJS configuration

Adapt your `systemjs.config.js` (or another place where you configure SystemJS) file with the following:

```javascript
System.config({
  ...
  map: {
    ...
    'google-maps-angular2':      'npm:google-maps-angular2/dist'
    ...
  },
  packages: {
    ...
    rxjs: {
      main: 'Rx.js',
      defaultExtension: 'js'
    },
    'google-maps-angular2': {
      defaultExtension: 'js',
      main: 'index.js',
      format: 'cjs'
    }
    ...
  }
})
```


## Usage

First, import `GoogleMapsModule` into the angular module where you want to use it:

```typescript
import {GoogleMapsModule} from 'google-maps-angular2';

imports: [
  ...
    @NgModule({
        ...
        imports: [
            ...
            GoogleMapsModule.forRoot({
                url: 'You google api link without callback'
            })
        ]

    })
  ...
]
```
Insert into component template

```html
<input type="text" class="input" placeholder="Поиск..." #inputElement>
<div class="map" #mapElement></div>
```

## Default styles

```css
body {
    margin: 0;
    padding: 0;
}
.map {
    width: 100%;
    height: 100vh;
}
.input {
    position: absolute;
        top: 30px;
        left: 30px;

    border: 1px solid silver;
        border-radius: 15px;

    font-family: Roboto;
        font-size: 15px;
        font-weight: lighter;
        text-align: center;

    padding: 10px;
    z-index: 100;
    width: 250px;
}
```

## Component configuration

```typescript
import {GoogleMapsService} from 'google-maps-angular2';

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
```