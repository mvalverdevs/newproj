import {AfterViewInit, Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {DataModelResult, ServiceForm} from './datasource.datasource';
import {SipsTable} from './sipsTable.class';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * Multiple selector
 */
@Directive()
export class SipsSelectableTable<Element,
  DataModel extends DataModelResult<Element>,
  Service extends ServiceForm<DataModel>>
  extends SipsTable<Element, DataModel, Service>
  implements OnInit, AfterViewInit, OnDestroy {

  protected unsubscribeSelectable$: Subject<void> = new Subject();

  isOpenSelected = false;
  defaultDisplayedColumns = this.displayedColumns;

  // Here we store the selected items in the list
  selection = new SelectionModel<Element>(true, []);

  // Here we store the ids of the global selected items
  globalSelection = new SelectionModel<number>(true, []);

  // Here we store the data of the selected items to be able to get the name from the id
  globalSelectionData = {};

  // Flag that indicates that items from all pages must be added to the selection
  allItemsSelected = false;

  @Input()
  displayedColumnsMultiple = []; // Columns to show
  @Input()
  defaultFilters = {}; // Default filters

  constructor(
    public formService: Service,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(formService, router, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    this.unsubscribeSelectable$.next();
    this.unsubscribeSelectable$.complete();
  }

  openSelected(): void {
    this.isOpenSelected = true;
    this.defaultDisplayedColumns = this.displayedColumns;
    this.displayedColumns = this.displayedColumnsMultiple;
  }

  closeSelected(): void {
    this.isOpenSelected = false;
    this.displayedColumns = this.defaultDisplayedColumns;
  }

  /**
   * Return the number of currently displayed rows
   */
  getCurrentRows(): number {
    const pageSize = this.paginatedTable.topPaginator.pageSize;
    const pageIndex = this.paginatedTable.topPaginator.pageIndex;
    const total = this.paginatedTable.topPaginator.length;

    return total > pageSize * (pageIndex + 1)
      ? pageSize
      : total - pageSize * pageIndex;
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected(): boolean {
    const numRows = this.getCurrentRows();
    const numSelected = this.selection.selected.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.allItemsSelected = false;
    } else {
      this.dataSource.elements$
        .pipe(
          take(1),
          takeUntil(this.unsubscribeSelectable$),
          map(items => items.forEach(row => this.selection.select(row)))
        )
        .subscribe();
    }
  }

  /**
   * Add the selected rows to the global selection
   *
   */
  addToGlobalSelection(): void {
    // If the user wants to add all items we need to load all pages from the server
    if (this.allItemsSelected) {
      const filters = { ...this.dataSource.formService.form.value };
      filters.limit = 10000;
      filters.offset = 0;

      this.dataSource.formService
        .submit(filters)
        .pipe(
          takeUntil(this.unsubscribeSelectable$),
          map(result =>
            result.results.forEach((item: any) => {
              this.globalSelectionData[item.id] = item;
              this.globalSelection.select(item.id);
            })
          )
        )
        .subscribe();
    } else {
      this.selection.selected.forEach((item: any) => {
        this.globalSelectionData[item.id] = item;
        this.globalSelection.select(item.id);
      });
    }

    this.selection.clear();
    this.allItemsSelected = false;
  }

  /**
   * Returns if the select all items box should be visible
   */
  public isVisibleSelectAll(): boolean {
    return this.isAllSelected() &&
      this.paginatedTable.bottomPaginator.length < 10000 &&
      this.paginatedTable.bottomPaginator.length >
      this.paginatedTable.bottomPaginator.pageSize;
  }

  /**
   * Switch form service to regular search
   *
   */
  regularSearch(): void {
    this.formService.form.markAsPristine();
    this.formService.reset(this.defaultFilters);
    this.dataSource.loadList();
  }

}

