import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    forwardRef,
} from '@angular/core';
import { async } from '@angular/core/testing';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { User } from 'api/defs/User';
import { UserListFormService } from 'api/forms/user/list/list.service';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap,
} from 'rxjs/operators';

@Component({
    selector: 'app-users-autocomplete',
    templateUrl: './users-autocomplete.component.html',
    styleUrls: ['./users-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UsersAutocompleteComponent),
            multi: true,
        },
    ],
})
export class UsersAutocompleteComponent
    implements OnInit, ControlValueAccessor
{
    users: any;
    usersData: any = [];
    modelUsers: any;

    users$: Observable<User[]>;
    usersInput$ = new Subject<string>();
    usersLoading = false;

    visible = true;
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

    @Input('data')
    set data(value: any) {
        if (value) {
            if (value.length > 0) {
                this.usersData.push(...value);
            } else {
                this.usersData.push(value);
            }
            this.prepareUsersList();
            this.visible = false;
            setTimeout(() => {
                this.visible = true;
            }, 100); // restart
        }
    }

    @Input() multiple: boolean;
    @Input() disabled: boolean;
    @Input() bgWhite: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
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

    constructor(public usersListFS: UserListFormService) {}

    // constructor() { }

    ngOnInit(): void {
        this.prepareUsersList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    clear(): void {
        this.ngSelectComponent.handleClearClick();
    }

    setUsers(node): void {
        if (node) {
            if (this.multiple) {
                this.users = [];
                for (const i in node) {
                    if (node[i]) {
                        this.users.push(node[i].id);
                    }
                }
            } else {
                this.users = node.id;
            }
        } else {
            this.users = null;
        }
        this.emit.emit(this.users);
        this.propagateChange(this.users);
        this.change.emit(this.users);
    }

    propagateChange = (_: any) => {};

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.users = value;
            this.modelUsers = value;
        } else {
            if (this.multiple) {
                this.users = [];
                this.modelUsers = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {}

    private prepareUsersList(): void {
        this.users$ = concat(
            of(this.usersData), // Default is an empty list
            this.usersInput$.pipe(
                startWith(''),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if (
                        (term && term.length >= this.matMinLength) ||
                        this.matMinLength === 0
                    ) {
                        this.usersListFS.cancelPreviousRequest();
                        return this.usersListFS
                            .submit({
                                search: term,
                                limit: 1000,
                                fields: 'id,username,email,first_name,last_name',
                                is_active: 'true',
                            })
                            .pipe(
                                map((data) => {
                                    this.usersData.push(...data.results);
                                    return data.results;
                                }),
                                catchError((error) => throwError(error))
                            );
                    }
                    return of([]);
                })
            )
        );
    }

    protected readonly async = async;
}
