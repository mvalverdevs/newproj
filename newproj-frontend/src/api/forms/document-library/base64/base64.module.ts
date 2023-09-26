/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DocumentLibraryService} from '../../../controllers/DocumentLibrary';
import {FormsSharedModule} from '../../forms-shared.module';
import {DocumentLibraryBase64FormService} from './base64.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DocumentLibraryService,
    DocumentLibraryBase64FormService,
  ],
})
export class DocumentLibraryBase64Module {}
