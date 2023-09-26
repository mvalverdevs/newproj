import {Component, OnInit, Input, forwardRef, OnDestroy, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NgClass, NgForOf, NgIf} from "@angular/common";


interface FormService {
    form: FormGroup;

    patch(value: any): void;
}


interface OrderingMethod {
    field: string;
    name: string;
}

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        NgClass,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {

    @Input()
    formServices: FormService[];

    @Input()
    orderingMethods: OrderingMethod[];

    @Output() reordered = new EventEmitter<void>();

    selected = '';
    order = 'asc';

    constructor() {
    }

    ngOnInit(): void {
        this.orderingMethods.forEach(method => {
            if (this.formServices[0].form.value.ordering === method.field) {
                this.selected = method.name;
                this.order = 'asc';
            } else if (this.formServices[0].form.value.ordering === '-' + method.field) {
                this.selected = method.name;
                this.order = 'desc';
            }
        });
    }

    ordering(method: OrderingMethod): void {
        this.selected = method.name;
        if (this.formServices[0].form.value.ordering === method.field) {
            this.formServices.forEach(formService => formService.patch({ordering: '-' + method.field}));
            this.order = 'desc';
        } else {
            this.formServices.forEach(formService => formService.patch({ordering: method.field}));
            this.order = 'asc';
        }

        this.reordered.emit();
    }

}
