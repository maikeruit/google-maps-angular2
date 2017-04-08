import {Injectable, ModuleWithProviders, Optional} from '@angular/core';
import {UserServiceConfig} from './google-maps.class';
import {BehaviorSubject, Observable} from 'rxjs/Rx';

@Injectable()
export class GoogleMapsService {

    /**
     * Google Maps Api link
     */
    readonly url: string;

    /**
     * Promise to callback
     */
    private loadAPI: Promise<any>;

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
     * Constructor
     * @param config
     */
    constructor(@Optional() config: UserServiceConfig) {
        if (config) {
            this.url = config.url + '&callback=__onGoogleLoaded';
        } else {
            throw new Error('Module have been forRoot({API_KEY: your api key})');
        }
    }

    /**
     * Load script
     */
    private loadScript(): void {
        if (!document.getElementById('google-maps-angular2')) {
            const script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = `${this.url}`;
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
}
