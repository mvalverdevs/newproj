/* tslint:disable:max-line-length */

export interface DocumentLibraryCreate {
  id?: number;
  /** Document name */
  name: string;
  /** document reference uuid */
  document: string;
  type?: number;
  /** Title */
  title?: string;
  /** Author */
  author?: string;
  /** License type */
  type_license?: Type_licenseDocumentLibraryCreateEnum;
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
}

export type Type_licenseDocumentLibraryCreateEnum =
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
