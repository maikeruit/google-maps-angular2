import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsService} from './google-maps.service';
import {UserServiceConfig} from "./google-maps.class";

@NgModule({
    imports: [CommonModule],
    providers: [GoogleMapsService]
})
export class GoogleMapsModule {
    /**
     * Configure core method
     * @param config
     * @returns {{ngModule: GoogleMapsModule, providers: [{provide: UserServiceConfig, useValue: UserServiceConfig}]}}
     */
    static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                {provide: UserServiceConfig, useValue: config}
            ]
        };
    }
}
