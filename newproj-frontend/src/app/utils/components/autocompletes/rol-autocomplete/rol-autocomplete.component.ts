import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { async } from "@angular/core/testing";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserRole } from "api/defs/UserRole";
import { UserRoleUserRoleFormService } from "api/forms/user-role/userRole/userRole.service";
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-rol-autocomplete',
    templateUrl: './rol-autocomplete.component.html',
    styleUrls: ['./rol-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RolAutocompleteComponent),
            multi: true
        }
    ]
})
export class RolAutocompleteComponent implements OnInit, ControlValueAccessor {

    rol: any;
    rolData: any = [];
    modelRol: any;

    rol$: Observable<UserRole[]>;
    rolInput$ = new Subject<string>();
    rolLoading = false;

    visible = true;

    @Input('data')
    set data(value: any) {
        if (value){
            if (value.length > 0){
              this.rolData.push(...value);
            }else{
              this.rolData.push(value);
            }
            this.prepareRolList();
            this.visible = false;
            setTimeout(() => { this.visible = true; }, 100); // restart
        }
    }

    @Input() multiple: boolean;
    @Input() disabled: boolean;
    @Input() heightAuto: boolean;
    @Input() bgWhite: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() readonly: boolean;
    @Input() control: any;
    @Input() matMinLength: number;
    @Input() position = 'auto';
    @Input() canCreate = false;

    @Output()
    create = new EventEmitter<string>();

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public rolListFS: UserRoleUserRoleFormService) { }

    ngOnInit(): void {
        this.prepareRolList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setRol(node): void {
      if (node) {
            if (this.multiple) {
                this.rol = [];
                for (const i in node) {
                  if (node[i]){
                    this.rol.push(node[i].id);
                  }
                }
            } else {
                this.rol = node.id;
            }
        } else {
            this.rol = null;
        }
      this.emit.emit(this.rol);
      this.propagateChange(this.rol);
      this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.rol = value;
            this.modelRol = value;
        } else {
            if (this.multiple) {
                this.rol = [];
                this.modelRol = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareRolList(): void {
        this.rol$ = concat(
            of(this.rolData), // Default is an empty list
            this.rolInput$.pipe(
                startWith(''),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        this.rolListFS.cancelPreviousRequest();
                        return this.rolListFS.submit({ search: term, limit: 1000, fields: 'id,role_display', status: 'active' }).pipe(
                            map(data => {
                              this.rolData.push(...data.results);
                              return data.results;
                            }),
                            catchError(error => throwError(error)),
                        );
                    }
                    return of([]);
                })
            )
        );
    }

    protected readonly async = async;
}


