import { Injectable } from '@angular/core';
import {isObject} from "lodash-es";
// import {isObject} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class CleanDataService {

  constructor() { }

  /**
   * Add _read to every key ending in _data recursively. This method will be useful in an update
   * FormService reset using an object returned by a read FormService. That object could have *_data keys which
   * used in NFGE for read only properties. Therefore, changing these _data properties is a good practise.
   * Because YASAG could fail when patch a read only property
   * @param value a dictionary to be replaced. This value is going to be modified, and it will be returned by the method
   */
  static data2read(value: any): any {
    const remove_keys = [];
    Object.keys(value).forEach(key => {
      if (key.endsWith('_data')) {
        remove_keys.push(key);
      } else if (isObject(value[key])) {
        CleanDataService.data2read(value[key]);
      }
    });
    remove_keys.forEach(key => {
      value[key + '_read'] = value[key];
      delete value[key];
    });
    return value;
  }

  /**
   * Removes every key ending in _data recursively or null value keys. This method will be useful in an update FormService reset
   * using an object returned by a read FormService. That object could have *_data keys which used in NFGE for
   * read only properties. Therefore, cleaning these _data properties is a good practise. Also YASAG could fail
   * when patch a read only property
   * @param value a dictionary to be clean. This value is going to be modified, and it will be returned by the method
   */
  static clean(value: any): any {
    const remove_keys = [];
    Object.keys(value).forEach(key => {
      if (key.endsWith('_data')) {
        remove_keys.push(key);
      } else if (isObject(value[key]) && !key.endsWith('_data_read')) {
        CleanDataService.clean(value[key]);
      } else if ( value[key] === null ) {
        remove_keys.push(key);
      }
    });
    remove_keys.forEach(key => delete value[key]);
    return value;
  }

  /**
   * Removes every null value recursively. This method will be useful in an update FormService reset
   * using an object returned by a read FormService.
   * @param value a dictionary to be clean. This value is going to be modified, and it will be returned by the method
   */
  static cleanNull(value: any): any {
    const remove_keys = [];
    Object.keys(value).forEach(key => {
      if (isObject(value[key])) {
        CleanDataService.cleanNull(value[key]);
      } else if ( value[key] === null ) {
        remove_keys.push(key);
      }
    });
    remove_keys.forEach(key => delete value[key]);
    return value;
  }

  /**
   * Removes every key 'id' recursively. This method will be useful in a clone
   * @param value a dictionary to be clean. This value is going to be modified, and it will be returned by the method
   */
  static cleanID(value: any): any {
    const remove_keys = [];
    Object.keys(value).forEach(key => {
      if (key == 'id') {
        remove_keys.push(key);
      } else if (isObject(value[key])) {
        CleanDataService.cleanID(value[key]);
      }
    });
    remove_keys.forEach(key => delete value[key]);
    return value;
  }
}
