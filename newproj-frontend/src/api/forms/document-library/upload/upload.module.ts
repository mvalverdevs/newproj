/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DocumentLibraryService} from '../../../controllers/DocumentLibrary';
import {FormsSharedModule} from '../../forms-shared.module';
import {DocumentLibraryUploadFormService} from './upload.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DocumentLibraryService,
    DocumentLibraryUploadFormService,
  ],
})
export class DocumentLibraryUploadModule {}
