import {AfterViewInit, Directive, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PaginatedTableComponent} from '@bcn/components/paginated-table/paginated-table.component';
import {DataModelResult, SipsDataSource, ServiceForm} from './datasource.datasource';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';

/**
 * Sincronize top and bottom paginators
 */
@Directive()
export class SipsTable<Element,
  DataModel extends DataModelResult<Element>,
  Service extends ServiceForm<DataModel>>
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('paginatedTable', {static: true}) paginatedTable: PaginatedTableComponent;

  @Input()
  displayedColumns = []; // Columns to show
  displayedColumnsMedium = []; // Columns to show in small config
  displayedColumnsSmall = []; // Columns to show in small config
  @Input()
  showHeaderRow = true;
  @Input()
  showSearch = true;
  @Input()
  styleConfig = 'big'; // big or small (without pagesizes, search, top paginator and small 'no results')

  dataSource: SipsDataSource<Element, DataModel, Service>;

  defaultFragment = '';
  currentFragment = '';

  fragmentObserver: Subscription;

  protected unsubscribeLoading$: Subject<void> = new Subject();

  constructor(
    public formService: Service,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.styleConfig === 'small') {
      this.displayedColumns = this.displayedColumnsSmall; // Columns to show
      this.showHeaderRow = false;
      this.showSearch = false;
    }

    if (this.styleConfig === 'medium') {
      this.displayedColumns = this.displayedColumnsMedium; // Columns to show
      this.showSearch = false;
    }

    // Connect with the data source
    this.formService.reset();
    this.dataSource =
      new SipsDataSource<Element,
        DataModel,
        Service>(this.formService);

    // Until firstLoaded gets to true, no URL change could be analyzed
    // this way we prevent flips during the page load
    let firstLoaded = null;
    const table = this;
    this.fragmentObserver = this.route.fragment.subscribe(fragment => {
      if (!fragment) {
        this.currentFragment = '';
      } else {
        this.currentFragment = fragment;
      }
      if (!fragment && this.defaultFragment !== '') {
        fragment = this.defaultFragment;
      }
      if (fragment && firstLoaded !== false) {
        firstLoaded = false;
        if (fragment !== this.getUrlParams()) {
          const payload = JSON.parse(atob(fragment));

          // We need to execute this Timeout to give some time to finish the page load
          setTimeout(() => {
            if (table.paginatedTable.topPaginator) {
              table.paginatedTable.topPaginator.pageIndex = payload['offset'] / payload['limit'];
              table.paginatedTable.topPaginator.pageSize = payload['limit'];
            }
            if (table.paginatedTable.bottomPaginator) {
              table.paginatedTable.bottomPaginator.pageIndex = payload['offset'] / payload['limit'];
              table.paginatedTable.bottomPaginator.pageSize = payload['limit'];
            }

            // Establishing the fields and expand, as it is not saved on the payload
            payload.fields = this.dataSource.formService.form.value.fields;
            payload.expand = this.dataSource.formService.form.value.expand;

            firstLoaded = true;
            table.formService.reset(payload);
            table.formService.form.markAsDirty();
            table.dataSource.loadList();
          }, 100);
        } else {
          firstLoaded = true;
        }
      } else {
        firstLoaded = true;
      }
    });
  }

  ngAfterViewInit(): void {
    // Connect the paginator with the dataSource when they are initialized
    this.dataSource.paginator = this.paginatedTable.topPaginator || this.paginatedTable.bottomPaginator;
    this.dataSource.loadList();
    this.defaultFragment = this.getUrlParams();
    this.dataSource.loading$.pipe(
      takeUntil(this.unsubscribeLoading$),
      tap(val => {
        if (val === false) {
          this.changeUrlParams();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
    this.fragmentObserver.unsubscribe();
    this.unsubscribeLoading$.next();
    this.unsubscribeLoading$.complete();
  }

  /**
   * Reload list
   */
  public reload(): void {
    if (this.paginatedTable.topPaginator) {
      this.paginatedTable.topPaginator.pageIndex = 0;
    }
    if (this.paginatedTable.bottomPaginator) {
      this.paginatedTable.bottomPaginator.pageIndex = 0;
    }
    // Get Attributes
    this.dataSource.loadList();

  }

  public getUrlParams(): string {
    // Update the URL to maintain the navigation
    const payload = {};
    Object.entries(this.dataSource.formService.form.value)
      .forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'fields' && key !== 'expand') {
          payload[key] = value;
        }
      });
    const base64 = btoa(JSON.stringify(payload));
    return base64;
  }

  public changeUrlParams(): void {
    const base64 = this.getUrlParams();
    if (base64 !== this.defaultFragment || this.currentFragment !== '') {
      this.router.navigateByUrl(this.router.url.split('#')[0] + '#' + base64);
    }
  }
}

