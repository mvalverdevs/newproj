/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {DocumentLibraryService} from '../../../controllers/DocumentLibrary';
import {FormsSharedModule} from '../../forms-shared.module';
import {DocumentLibraryReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    DocumentLibraryService,
    DocumentLibraryReadFormService,
  ],
})
export class DocumentLibraryReadModule {}
