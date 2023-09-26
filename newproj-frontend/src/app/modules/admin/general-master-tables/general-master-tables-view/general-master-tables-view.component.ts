import {Component} from '@angular/core';
import {catchError, map, Observable, of, Subject} from "rxjs";
import {GeneralMasterTables} from "../../../../../api/defs/GeneralMasterTables";
import {ActivatedRoute} from "@angular/router";
import {GeneralMasterTablesReadFormService} from "../../../../../api/forms/general-master-tables/read/read.service";

@Component({
    selector: 'app-general-master-tables-view',
    templateUrl: './general-master-tables-view.component.html',
    styleUrls: ['./general-master-tables-view.component.scss'],
    standalone: true,

})
export class GeneralMasterTablesViewComponent {
    generalMasterTables$: Observable<GeneralMasterTables>;

    error: boolean;
    generalMasterTables: any;


    private unsubscribe$: Subject<void> = new Subject();

    constructor(protected _activatedRoute: ActivatedRoute,
                protected formService: GeneralMasterTablesReadFormService,
    ) {
    }


    ngOnInit(): void {
        // Set attribute ID from route params and subscribe
        this._activatedRoute.params.subscribe(params => {
            this.formService.form.patchValue({
                id: params['id']
            });
            this.getGeneralMasterTables();
        });


    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    /**
     * Returns an Observable with the general master tables
     */
    public getGeneralMasterTables(): void {
        this.generalMasterTables$ = this.formService
            .submit(false, false)
            .pipe(
                map((generalMasterTables) => {
                    this.generalMasterTables = generalMasterTables;
                    return generalMasterTables;
                }),
                catchError(() => {
                    this.error = true;
                    return of(null);
                })
            );
    }

}
