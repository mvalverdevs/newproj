/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { DocumentLibraryListModule } from './list/list.module';
import { DocumentLibraryCreateModule } from './create/create.module';
import { DocumentLibraryUploadModule } from './upload/upload.module';
import { DocumentLibraryReadModule } from './read/read.module';
import { DocumentLibraryUpdateModule } from './update/update.module';
import { DocumentLibraryPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { DocumentLibraryDeleteModule } from './delete/delete.module';
import { DocumentLibraryBase64Module } from './base64/base64.module';

@NgModule({
  imports: [
    DocumentLibraryListModule,
    DocumentLibraryCreateModule,
    DocumentLibraryUploadModule,
    DocumentLibraryReadModule,
    DocumentLibraryUpdateModule,
    DocumentLibraryPartialUpdateModule,
    DocumentLibraryDeleteModule,
    DocumentLibraryBase64Module,
  ],
  exports: [
    DocumentLibraryListModule,
    DocumentLibraryCreateModule,
    DocumentLibraryUploadModule,
    DocumentLibraryReadModule,
    DocumentLibraryUpdateModule,
    DocumentLibraryPartialUpdateModule,
    DocumentLibraryDeleteModule,
    DocumentLibraryBase64Module,
  ],
})
export class DocumentLibraryFormModule {}
