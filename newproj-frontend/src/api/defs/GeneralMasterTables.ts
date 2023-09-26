/* tslint:disable:max-line-length */

export interface GeneralMasterTables {
  id?: number;
  name: string;
  type: TypeGeneralMasterTablesEnum;
  is_visible?: boolean;
  is_editable?: boolean;
  is_deletable?: boolean;
  behaviour_id?: number[];
  parent_table: number[];
}

export type TypeGeneralMasterTablesEnum =
  'reference_in' |
  'food_field' |
  'environmental_field' |
  'non_compliance' |
  'precautionary_measures' |
  'type_of_action' |
  'reason_for_inspection' |
  'indret_center_type' |
  'indret_category' |
  'indret_type' |
  'indret_center' |
  'indret_contact_relation' |
  'indret_document_type' |
  'description_of_activity' |
  'types_of_biocides' |
  'hazard_classification_of_biocides' |
  'category' |
  'indret_water_sector' |
  'indret_circuit_type' |
  'action_inspection_reason' |
  'action_rate' |
  'action_capacity' |
  'sample_observations' |
  'sample_type';
