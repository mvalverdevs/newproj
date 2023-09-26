import {OnInit, Input, OnDestroy, Directive, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {takeUntil, map, catchError} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {Utils} from './utils';

export interface FormService<Entity> {
    form: FormGroup;
    defaultValue: any;
    serverErrors$: Observable<any>;
    loading$: Observable<boolean>;

    submit(value?: any): Observable<Entity>;
}

@Directive()
export class SipsForm<FS extends FormService<Entity>, Entity> implements OnInit, OnDestroy, OnChanges {

    constructor(
        protected snackBar: MatSnackBar
    ) {
    }

    @Input() formService: FS;
    @Input() showSaveButton = true;

    @Output() saved = new EventEmitter<Entity>();
    @Output() changed = new EventEmitter<Entity>();

    messageSavedSuccessfully = $localize`Guardat correctament.`;
    messageSavedError = $localize`S'ha produït un error en guardar. Revisi els camps marcats en vermell. `;

    form: FormGroup;
    serverErrors: any;

    saving$: Observable<boolean>;

    protected unsubscribe$: Subject<void> = new Subject();

    protected onSavedSuccessfully = (entity: Entity): Entity => entity;
    protected onSavedError = (errors: any): void => null;

    ngOnInit(): void {
        this.initializeFormService();
    }

    ngOnChanges(change: SimpleChanges): void {
        if (this.form !== this.formService?.form) {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
            this.initializeFormService();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    initializeFormService(): void {
        this.form = this.formService.form;
        this.saving$ = this.formService.loading$;

        // Subscribe to server errors
        this.formService.serverErrors$
            .pipe(
                takeUntil(this.unsubscribe$),
                map(errors => (this.serverErrors = errors))
            )
            .subscribe();
    }

    submit(): void {
        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map((entity: Entity) => {
                    entity = this.onSavedSuccessfully(entity);
                    this.saved.emit(entity);
                    this.changed.emit(entity);
                    this.snackBar.open(
                        this.messageSavedSuccessfully,
                        $localize`Tancar`, {duration: 6000}
                    );
                }),
                catchError(errors => {
                    this.onSavedError(errors);
                    if (errors && errors.error.non_field_errors) {
                        this.snackBar.open(
                            errors.error.non_field_errors,
                            $localize`Tancar`,
                            {panelClass: 'error', duration:2000}
                        );
                    } else {
                        this.snackBar.open(
                            this.messageSavedError,
                            $localize`Tancar`,
                            {panelClass: 'error', duration:2000}
                        );
                    }

                    Utils.processServerErrors(
                        this.form.controls.data['controls'],
                        errors.error
                    );
                    return of({});
                })
            )
            .subscribe();
    }
}
