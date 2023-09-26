import {BcnPaginatorComponent} from './components/bcn-paginator/bcn-paginator.component';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BCNDirectivesModule} from './directives/directives';
import {BCNPipesModule} from './pipes/pipes';
import {NgxContentLoadingModule} from 'ngx-content-loading';
import {BCNErrorModule} from './components/bcn-error/bcn-error.module';
import {FakeLoadingComponent} from './components/fake-loading/fake-loading.component';
import {QuillModule} from 'ngx-quill';
import {NoResultsComponent} from './components/no-results/no-results.component';
import {MatIconModule} from '@angular/material/icon';
import {PaginatedTableComponent} from './components/paginated-table/paginated-table.component';
import {SipsMaterialModule} from '../app/sips-material.module';
import {BCNSidebarModule} from './components';
import {SidebarService} from './services/sidebar.service';
import {GoBackButtonComponent} from './components/go-back-button/go-back-button.component';
import {PrevNextComponent} from "./components/prevnext/prevnext.component";


@NgModule({
    providers: [
        // SidebarService
    ],
    declarations: [
        // FakeLoadingComponent,
        // NoResultsComponent,
        // PaginatedTableComponent,
        // GoBackButtonComponent,
        // BcnPaginatorComponent,
        // PrevNextComponent
    ],
    imports: [
        // FormsModule,
        // ReactiveFormsModule,
        // FlexLayoutModule,
        // BCNDirectivesModule,
        // BCNPipesModule,
        // // BCNDialogsModule,
        // NgxContentLoadingModule,
        // BCNErrorModule,
        // QuillModule,
        // MatIconModule,
        // SipsMaterialModule,
        // BCNSidebarModule
    ],
    exports: [
        // CommonModule,
        // FormsModule,
        // ReactiveFormsModule,
        // FlexLayoutModule,
        // BCNDirectivesModule,
        // BCNPipesModule,
        // // BCNDialogsModule,
        // NgxContentLoadingModule,
        // BCNErrorModule,
        // FakeLoadingComponent,
        // QuillModule,
        // NoResultsComponent,
        // PaginatedTableComponent,
        // BCNSidebarModule,
        // GoBackButtonComponent,
        // BcnPaginatorComponent,
        // PrevNextComponent
    ]
})
export class BCNSharedModule {
}
