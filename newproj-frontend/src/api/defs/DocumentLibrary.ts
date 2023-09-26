/* tslint:disable:max-line-length */

export interface DocumentLibrary {
  id?: number;
  /** Document name */
  name: string;
  /**
   * Document URL
   * format: uri
   */
  document?: string;
  /** Title */
  title?: string;
  /** Author */
  author?: string;
  /** License type */
  type_license?: Type_licenseDocumentLibraryEnum;
  /** Photo description */
  description?: string;
  /**
   * Date on which the deletion of the photo is scheduled
   * format: date-time
   */
  expiry_date?: string;
  /** The file is visible on Internet */
  visible?: boolean;
  /** Document category */
  category?: number;
  category_data?: string;
  type?: number;
}

export type Type_licenseDocumentLibraryEnum =
  'sense-llicencia' |
  'copyright' |
  'copyleft' |
  'cc-by' |
  'cc-by-nc' |
  'by-nc-sa' |
  'by-nc-nd' |
  'by-sa' |
  'by-nd' |
  'publica';
