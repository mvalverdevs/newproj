/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DocumentLibraryService} from '../../../controllers/DocumentLibrary';
import {FormsSharedModule} from '../../forms-shared.module';
import {DocumentLibraryListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DocumentLibraryService,
    DocumentLibraryListFormService,
  ],
})
export class DocumentLibraryListModule {}
