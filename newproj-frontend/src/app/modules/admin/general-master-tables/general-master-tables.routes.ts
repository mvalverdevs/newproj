import {Routes} from '@angular/router';
import {GeneralMasterTablesListComponent} from "./general-master-tables-list/general-master-tables-list.component";
import {
    GeneralMasterTablesCreateComponent
} from "./general-master-tables-create/general-master-tables-create.component";
import {GeneralMasterTablesEditComponent} from "./general-master-tables-edit/general-master-tables-edit.component";
import {GeneralMasterTablesViewComponent} from "./general-master-tables-view/general-master-tables-view.component";

export default [
    {
        path: '',
        component: GeneralMasterTablesListComponent,
    },
    {
        path: 'new',
        component: GeneralMasterTablesCreateComponent
    },
    {
        path: ':id/edit',
        component: GeneralMasterTablesEditComponent
    },
    {
        path: ':id',
        component: GeneralMasterTablesViewComponent
    }
] as Routes;
