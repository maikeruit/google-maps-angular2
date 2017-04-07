import {Injectable, ModuleWithProviders, Optional} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserServiceConfig} from "./google-maps.class";

@Injectable()
export class GoogleMapsService {

    /**
     * Google Maps Api key
     */
    readonly API_KEY: string;

    /**
     * Google Maps Libraries
     */
    private libraries: Array<string>;

    /**
     * Promise to callback
     */
    private loadAPI: Promise<any>;

    /**
     * google.maps subject
     */
    private _map = new BehaviorSubject(null);

    /**
     * Constructor
     * @param config
     */
    constructor(@Optional() config: UserServiceConfig) {
        if (config) {
            this.API_KEY = config.API_KEY;
            this.libraries = config.libraries;
        } else {
            throw new Error('Module have been forRoot({API_KEY: your api key})');
        }
    }

    /**
     * Configure core method
     * @param config
     * @returns {{ngModule: GoogleMapsService, providers: [{provide: UserServiceConfig, useValue: UserServiceConfig}]}}
     */
    static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: GoogleMapsService,
            providers: [
                {provide: UserServiceConfig, useValue: config}
            ]
        };
    }

    /**
     * Load script
     */
    private loadScript(): void {
        if (!document.getElementById('google-maps-angular2')) {
            let script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = `https://maps.googleapis.com/maps/api/js?libraries=${this.libraries.join('&')}&callback=__onGoogleLoaded&key=${this.API_KEY}`;
            script.id = 'google-maps-angular2';

            document.head.appendChild(script);
        }
    }

    /**
     * Wait callback and return google.maps object
     * @returns {Promise<any>}
     */
    get init(): Promise<any> {
        if (!this.loadAPI) {
            this.loadAPI = new Promise((resolve) => {
                window['__onGoogleLoaded'] = (ev: any) => {
                    resolve(window['google']['maps']);
                };

                this.loadScript();
            });
        }

        return this.loadAPI;
    }


    /**
     * Map setter
     * @param map
     */
    set map(map) {
        this._map.next(map);
    }

    /**
     * Map getter
     * @returns {BehaviorSubject}
     */
    get map(): BehaviorSubject<any> {
        return this._map;
    }
}
