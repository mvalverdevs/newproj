import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';
import { StriptagsPipe } from './striptags.pipe';

@NgModule({
    declarations: [

        TruncatePipe,
        StriptagsPipe
    ],
    imports     : [],
    exports     : [
        TruncatePipe,
        StriptagsPipe
    ]
})
export class BCNPipesModule
{
}
