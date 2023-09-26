import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IndretActionReadFormService,
    IndretActionPartialUpdateFormService,
} from 'api/form-service';
import { IndretAction } from 'api/model';
import { AuthService } from 'app/utils/auth.service';
import { Observable, Subject, map, catchError, of } from 'rxjs';

@Component({
    selector: 'app-actions-view',
    templateUrl: './actions-view.component.html',
    styleUrls: ['./actions-view.component.scss'],
})
export class ActionsViewComponent {
    action$: Observable<IndretAction>;

    error: boolean;
    action: any;

    completeAreaDict: any = {};
    completeRoleDict: any = {};

    private unsubscribe$: Subject<void> = new Subject();
    private _matDialog: MatDialog = inject(MatDialog);
    constructor(
        public formService: IndretActionReadFormService,
        protected _actionPartialUpdateFormService: IndretActionPartialUpdateFormService,
        private _authService: AuthService,
        protected activatedRoute: ActivatedRoute,
        protected _snackBar: MatSnackBar,
        protected _router: Router
    ) {}

    ngOnInit(): void {
        // Set attribute ID from route params and subscribe
        this.activatedRoute.params.subscribe((params) => {
            this.formService.form.patchValue({
                id: params['id'],
                fields: 'id,documents.~all,planning_period,products.~all,status,technicians,type_is_alimentary,rate,action_date,action_type,creator,date_scheduled,deactivation_reason,documents,id_action,indret.id,indret_changes,indret_circuits.id,inspection_reason,interested,is_presencial,minute.~all,observations,other_reasons,',
            });
            this.getIndretAction();
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    /**
     * Returns an Observable with the users
     */
    public getIndretAction(): void {
        this.action$ = this.formService.submit(false, false).pipe(
            map((action) => {
                this.action = action;
                return action;
            }),
            catchError(() => {
                this.error = true;
                return of(null);
            })
        );

        // this.getData();
    }
}
