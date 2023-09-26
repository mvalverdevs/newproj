import {DescriptionDialogComponent} from './description/description.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {ConfirmDialogComponent} from './confirm/confirm.component';
import {InfoDialogComponent} from './info/info.component';
import {FileDialogComponent} from './file/file.component';
import {InputFileConfig, InputFileModule} from 'ngx-input-file';
import {SpinnerDialogComponent} from './spinner/spinner.component';
import {YesNoDialogComponent} from './yesno/yesno.component';
import {DeleteDialogComponent} from "./delete/delete.component";
import {OptionsDialogComponent} from "./options/options.component";

const config: InputFileConfig = {fileAccept: '*', fileLimit: 1};


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatFormFieldModule,
        InputFileModule.forRoot(config),

    ],
    exports: [
        InfoDialogComponent,
        DescriptionDialogComponent,
        FileDialogComponent,
        SpinnerDialogComponent
    ],
    declarations: [
        InfoDialogComponent,
        DescriptionDialogComponent,
        FileDialogComponent,
        SpinnerDialogComponent,
        YesNoDialogComponent,
    ],
    // entryComponents: [
    //   ConfirmDialogComponent,
    //   InfoDialogComponent,
    //   DescriptionDialogComponent,
    //   FileDialogComponent,
    //   SpinnerDialogComponent,
    //   YesNoDialogComponent
    // ]
})
export class BCNDialogsModule {
}
