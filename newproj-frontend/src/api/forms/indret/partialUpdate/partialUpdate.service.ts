/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretService } from '../../../controllers/Indret';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretPartialUpdateFormService extends YASAGPostFormService<__model.Indret> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretService,
  ) {
    super('IndretPartialUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        indret_contacts: new FormArray([], [Validators.required]),
        identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        id_source: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        name: new FormControl({value: undefined, disabled: false}, []),
        categories: new FormControl([], []),
        types: new FormControl([], []),
        pncoca: new FormControl({value: undefined, disabled: false}, []),
        retail_registration_number: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        number_workers: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        registration_date: new FormControl({value: undefined, disabled: false}, []),
        ambiental_risk: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        before_1980: new FormControl({value: undefined, disabled: false}, []),
        home_deposit: new FormControl({value: undefined, disabled: false}, []),
        is_property: new FormControl({value: undefined, disabled: false}, []),
        school_code: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        risk: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        number_users: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        water_usage: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        usual_water_usage: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
        start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
        neighborhood_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        neighborhood_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
        district_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        district_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
        dev_coordinates_lat: new FormControl({value: undefined, disabled: false}, []),
        dev_coordinates_lon: new FormControl({value: undefined, disabled: false}, []),
        center: new FormControl({value: undefined, disabled: false}, []),
        has_deposit: new FormControl({value: undefined, disabled: false}, []),
        deposit_location: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        water_origin: new FormControl({value: undefined, disabled: false}, []),
        sector: new FormControl({value: undefined, disabled: false}, []),
        air_code: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        air_hour: new FormControl({value: undefined, disabled: false}, []),
        air_traffic: new FormControl({value: undefined, disabled: false}, []),
        air_works_manual: new FormControl({value: undefined, disabled: false}, []),
        air_is_urban: new FormControl({value: undefined, disabled: false}, []),
        health_auth_number: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        titularity: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          is_legal_entity: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          first_name: new FormControl({value: undefined, disabled: false}, []),
          last_name: new FormControl({value: undefined, disabled: false}, []),
          second_last_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          identification_type: new FormControl({value: undefined, disabled: false}, []),
          social_reason: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          CIF: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          registration_date: new FormControl({value: undefined, disabled: false}, []),
          primary_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1), Validators.required]),
          secondary_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
          emails: new FormControl([], []),
          is_public: new FormControl({value: undefined, disabled: false}, []),
          tax_exempt: new FormControl({value: undefined, disabled: false}, []),
          group: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
          type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32)]),
          type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1), Validators.required]),
          street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1), Validators.required]),
          start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1), Validators.required]),
          zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
          population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1), Validators.required]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1), Validators.required]),
        }, []),
        titularity_id: new FormControl({value: undefined, disabled: false}, []),
        notification_person_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        notification_email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1)]),
        notification_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
        related_indrets: new FormControl([], []),
        observations: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        documents: new FormControl([], []),
        circuits: new FormArray([], [Validators.required]),
        is_active: new FormControl({value: undefined, disabled: false}, []),
        deactivation_reason: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  public addDataIndretContacts( indret_contacts: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['indret_contacts'];
    const fg = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, []),
      indret: new FormControl({value: undefined, disabled: false}, []),
      relation: new FormControl({value: undefined, disabled: false}, []),
      first_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      last_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1), Validators.required]),
      phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1), Validators.required]),
      scope_is_alimentary: new FormControl({value: undefined, disabled: false}, [Validators.required]),
      identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      identification_type: new FormControl({value: undefined, disabled: false}, []),
      documents_accreditative: new FormControl([], []),
    }, []);
    __utils.addField(control,indret_contacts, fg, position, value);
  }

  public removeDataIndretContacts( i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['indret_contacts'];
    control.removeAt(i);
  }

  public addDataCircuitsSamplePoints(circuits: number,  sample_points: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['circuits']['controls'][circuits]['controls']['sample_points'];
    const fg = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, []),
      name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      is_active: new FormControl({value: undefined, disabled: false}, []),
      indret_circuit: new FormControl({value: undefined, disabled: false}, []),
    }, []);
    __utils.addField(control,sample_points, fg, position, value);
  }

  public removeDataCircuitsSamplePoints(circuits: number,  i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['circuits']['controls'][circuits]['controls']['sample_points'];
    control.removeAt(i);
  }

  public addDataCircuits( circuits: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['circuits'];
    const fg = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, []),
      sample_points: new FormArray([], []),
      canteen: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        management_company: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
          email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1)]),
          contact_person: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          address: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rsipac: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rgs: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          registered_office: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          observations: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
          start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
          population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
        }, []),
        supply_company: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
          email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1)]),
          contact_person: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          address: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rsipac: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rgs: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          registered_office: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          observations: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
          start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
          population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
        }, []),
        ages: new FormControl([], []),
        feeding_bottle_childs: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        menu_per_turn: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        reception_hours: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        has_donations: new FormControl({value: undefined, disabled: false}, []),
        is_attached_to_project: new FormControl({value: undefined, disabled: false}, []),
        project_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        is_supply_intern: new FormControl({value: undefined, disabled: false}, []),
        is_supply_extern: new FormControl({value: undefined, disabled: false}, []),
        type_supply_company: new FormControl({value: undefined, disabled: false}, []),
        type_supply: new FormControl({value: undefined, disabled: false}, []),
        is_internal_management: new FormControl({value: undefined, disabled: false}, []),
        supplies_others: new FormControl({value: undefined, disabled: false}, []),
        other_supply_companies: new FormControl({value: undefined, disabled: false}, []),
        number_lunch_menus: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        number_diner_menus: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        week_days: new FormControl([], []),
      }, []),
      is_active: new FormControl({value: undefined, disabled: false}, []),
      is_canteen: new FormControl({value: undefined, disabled: false}, []),
      name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      registration_date: new FormControl({value: undefined, disabled: false}, []),
      termination_date: new FormControl({value: undefined, disabled: false}, []),
      indret: new FormControl({value: undefined, disabled: false}, []),
      type: new FormControl({value: undefined, disabled: false}, []),
      tech_responsible: new FormControl({value: undefined, disabled: false}, []),
    }, []);
    __utils.addField(control,circuits, fg, position, value);
  }

  public removeDataCircuits( i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['circuits'];
    control.removeAt(i);
  }

  submit(value: any = false): Observable<__model.Indret> {
    const result = val => this.service.partialUpdate(val);
    return this._submit('__model.Indret', result, 'data', value, true );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.Indret> {
    if (submit) {
      this.submit(value);
    }
    return this._listen(value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    while ((<FormArray>this.form['controls']['data']['controls']['indret_contacts']).length) {
      this.removeDataIndretContacts(0);
    }
    if (value && value['data'] && value['data']['indret_contacts']) {
      this.addDataIndretContacts(value['data']['indret_contacts'].length);
    }
    while ((<FormArray>this.form['controls']['data']['controls']['circuits']).length) {
      this.removeDataCircuits(0);
    }
    if (value && value['data'] && value['data']['circuits']) {
      this.addDataCircuits(value['data']['circuits'].length);
      value['data']['circuits'].forEach((circuits_object, circuits) => {
        if (value && value['data'] && value['data']['circuits'] && value['data']['circuits'][circuits]['sample_points']) {
          this.addDataCircuitsSamplePoints(circuits, value['data']['circuits'][circuits]['sample_points'].length);
        }
      });
    }
    super.reset(value, true); 
  }
  patch(value: any): void {
    if (value && value['data'] && value['data']['indret_contacts']) {
      while (this.form.value['data']['indret_contacts'].length > 0) {
        this.removeDataIndretContacts(0);
      }
      if (value['data']['indret_contacts'].length > this.form.value['data']['indret_contacts'].length) {
        this.addDataIndretContacts(value['data']['indret_contacts'].length - this.form.value['data']['indret_contacts'].length);
      }
    }
    if (value && value['data'] && value['data']['circuits']) {
      while (this.form.value['data']['circuits'].length > 0) {
        this.removeDataCircuits(0);
      }
      if (value['data']['circuits'].length > this.form.value['data']['circuits'].length) {
        this.addDataCircuits(value['data']['circuits'].length - this.form.value['data']['circuits'].length);
      }
      value['data']['circuits'].forEach((circuits_object, circuits) => {
        if (value && value['data'] && value['data']['circuits'] && value['data']['circuits'][circuits]['sample_points']) {
          if (value['data']['circuits'][circuits]['sample_points'].length > this.form.value['data']['circuits'][circuits]['sample_points'].length) {
            this.addDataCircuitsSamplePoints(circuits, value['data']['circuits'][circuits]['sample_points'].length - this.form.value['data']['circuits'][circuits]['sample_points'].length);
          }
        }
      });
    }
    this.form.patchValue(value);
  }
}
