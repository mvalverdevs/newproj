import {NgModule} from '@angular/core';
import {FakeLoadingComponent} from "./fake-loading.component";
import {NgIf} from "@angular/common";

@NgModule({
    providers: [],
    declarations: [FakeLoadingComponent],
    imports: [
        NgIf
    ],
    exports: [
        FakeLoadingComponent
    ]
})
export class FakeLoadingModule {
}
