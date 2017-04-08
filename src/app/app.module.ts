import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GoogleMapsModule} from './google-maps.module';

@NgModule({
    imports: [
        BrowserModule,
        /**
         * You api link.
         * Without callback!!
         */
        GoogleMapsModule.forRoot({
            url: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBsBy-fZP6s_J-pRfM5tJQHjKFvAXg5o_I'
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
