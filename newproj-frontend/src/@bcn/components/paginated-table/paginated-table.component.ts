import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BcnPaginatorComponent} from "../bcn-paginator/bcn-paginator.component";
import {NoResultsComponent} from "../no-results/no-results.component";
import {FakeLoadingModule} from "../fake-loading/fake-loading.module";
import {NgIf} from "@angular/common";
import {FakeLoadingComponent} from "../fake-loading/fake-loading.component";

@Component({
    selector: 'app-paginated-table',
    templateUrl: './paginated-table.component.html',
    standalone: true,
    imports: [
        FlexLayoutModule,
        MatProgressSpinnerModule,
        BcnPaginatorComponent,
        NoResultsComponent,
        FakeLoadingModule,
        NgIf
    ],
    styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent implements OnInit {
    @ViewChild('topPaginator', {static: true})
    topPaginator: MatPaginator;
    @ViewChild('bottomPaginator', {static: true})
    bottomPaginator: MatPaginator;

    @Input()
    pageSizeOptions = [10, 20, 50];
    isOpenSelected = false;

    @Input('multipleSelector')
    set changePaginatorConfig(value: any) {
        this.isOpenSelected = value;
        this.paginatorConfig = (value) ? 'bottom' : 'both';
    }

    @Input()
    paginatorConfig = 'both'; // both, bottom, top, none
    @Input()
    styleConfig = 'big'; // // big, medium or small
    @Input()
    resultsCount = 0;
    @Input()
    loading = false;
    @Input()
    selectedAmount = 0;

    constructor(
        private router: Router,
        protected route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.styleConfig === 'small' || this.styleConfig === 'medium') {
            this.pageSizeOptions = [10];
            this.paginatorConfig = 'bottom';
        }
    }

    syncPaginators(event: PageEvent): void {
        if (
            this.topPaginator &&
            (this.topPaginator.pageSize !== event.pageSize ||
                this.topPaginator.pageIndex !== event.pageIndex)
        ) {
            // Changes in bottom Paginator
            this.topPaginator.pageSize = event.pageSize;
            this.topPaginator.pageIndex = event.pageIndex;
            // The bottom paginator is not connected with the dataSource
            // so we need to emit the event to actually change the page
            this.topPaginator.page.emit(event);
        } else {
            // Changes in top paginator
            if (this.bottomPaginator) {
                this.bottomPaginator.pageSize = event.pageSize;
                this.bottomPaginator.pageIndex = event.pageIndex;
            }
        }
    }
}
