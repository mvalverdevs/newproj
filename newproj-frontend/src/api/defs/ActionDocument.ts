/* tslint:disable:max-line-length */

export interface ActionDocument {
  type: TypeActionDocumentEnum;
  other_type_text?: string;
  document?: number;
  file_name: string;
}

export type TypeActionDocumentEnum =
  'invoice' |
  'label' |
  'tech_invoice' |
  'sec_invoice' |
  'photo' |
  'contract' |
  'appcc' |
  'psa' |
  'minute' |
  'report' |
  'others';
