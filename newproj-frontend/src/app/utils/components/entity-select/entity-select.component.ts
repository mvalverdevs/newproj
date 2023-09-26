import {Component, OnInit, forwardRef, Input, EventEmitter, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {NgSelectModule} from "@ng-select/ng-select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-entity-select',
    templateUrl: './entity-select.component.html',
    styleUrls: ['./entity-select.component.scss'],
    standalone: true,
    imports: [
        NgSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        NgIf,
        NgForOf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EntitySelectComponent),
            multi: true
        }
    ]
})
export class EntitySelectComponent implements OnInit, ControlValueAccessor {

    entity: number[];
    entityData: any = {};

    // entity$: Observable<Entity[]>;
    entity$: Observable<[]>;
    entityInput$ = new Subject<string>();

    selectedEntity: any;
    modelEntity: any;

    @Input('data')
    // set data(value: Entity[]) {
    set data(value: []) {
        if (value) {
            this.entityData = value.reduce((obj, item) => {
                obj[item['id']] = item;
                return obj;
            }, {});
        }
    }

    @Input() hint: string;

    @Output()
    emit = new EventEmitter<number[]>();
    change;

    // constructor(public entityListFS: EntityListFormService) {
    constructor() {
        this.change = this.emit;
    }

    ngOnInit(): void {
        this.prepareEntityList();
    }

    setEntity(node): void {
        this.selectedEntity = node;
    }

    selectEntity(node): void {
        this.modelEntity = null;

        if (node) {
            let exists = false;
            this.entity.forEach(
                c => {
                    if (c === node.id) {
                        exists = true;
                    }
                }
            );

            if (!exists) {
                this.entityData[node.id] = node;
                this.entity.push(node.id);
            }
        }

        this.change.emit(this.entity);
        this.propagateChange(this.entity);
    }

    clearEntity(): void {
        this.entity = [];
        this.propagateChange(this.entity);
        this.change.emit(this.entity);
    }

    removeNode(entityId): void {
        this.entity.splice(this.entity.indexOf(entityId), 1);
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                this.entity = value;
            } else {
                this.entity = [value];
            }
        } else {
            this.entity = [];
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareEntityList(): void {
        // this.entity$ = concat(
        //     of([]), // Default is an empty list
        //     this.entityInput$.pipe(
        //         startWith(''),
        //         debounceTime(700),
        //         distinctUntilChanged(),
        //         switchMap((term: string) => {
        //             return this.entityListFS.submit({search: term, limit: 50, fields: 'id,name'}).pipe(
        //                 map(data => data.results),
        //                 catchError(error => throwError(error)),
        //             );
        //         })
        //     )
        // );
    }

}

