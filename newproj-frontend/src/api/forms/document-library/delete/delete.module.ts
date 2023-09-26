/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DocumentLibraryService} from '../../../controllers/DocumentLibrary';
import {FormsSharedModule} from '../../forms-shared.module';
import {DocumentLibraryDeleteFormService} from './delete.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DocumentLibraryService,
    DocumentLibraryDeleteFormService,
  ],
})
export class DocumentLibraryDeleteModule {}
