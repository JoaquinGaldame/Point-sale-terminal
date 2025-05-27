import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { ISettings, ITypography, ITheme } from '../Settings/settings.interface';
import { SETTINGS } from '../Settings/DataSettings';

@Injectable({
  providedIn: 'root'
})

export class settingService {
  private _config: BehaviorSubject<ISettings>;

  constructor()
  {
    this._config = new BehaviorSubject(SETTINGS);
  }

  /**
     * Setter & getter for config
     */
  set config(value: Partial<ISettings>) {
    // Merge the new config over the current config
    const config = { ...this._config.getValue(), ...value };
    this._config.next(config);
  }


  get config$(): Observable<ISettings>
  {
      return this._config.asObservable();
  }

   /**
   * Getter for current config value (síncrono)
   */
   get value(): ISettings {
    return this._config.getValue();
  }


  // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
  reset(): void
  {
      // Set the config
      this._config.next(SETTINGS);
  }


}