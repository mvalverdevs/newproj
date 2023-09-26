import {NestedTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTreeNestedDataSource} from '@angular/material/tree';

export interface Node {
    id?: number;
    children_count?: number;
    parent?: number;
}

export interface DataModel<Node> {
    id?: number;
    children?: Node[];
}

export interface ServiceForm<DataModel> {
    submit(value?: any, cache?: boolean): Observable<DataModel>;
}


/**
 * Sincronize top and bottom paginators
 */
export class SipsTree<
  T extends Node,
  Parent extends DataModel<T>,
  Service extends ServiceForm<Parent>> {

  constructor(
    public formService: Service
  ) {
    this.nestedTreeControl = new NestedTreeControl<T>((node) => this.getChildren(node));
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.subjects = [];
  }

  nestedTreeControl: NestedTreeControl<T>;
  nestedDataSource: MatTreeNestedDataSource<T>;
  subjects: {[id: number]: BehaviorSubject<T[]>};
  hasNestedChild = (_: number, nodeData: T) => nodeData.children_count > 0;

  private getChildren(node: T, reload: boolean = false, parent: boolean = false): Observable<T[]> {
    let soft_reload = false;
    let node_id = node.id;
    if ( parent === true ) {
      node_id = node.parent;
    }
    if ( !this.subjects[node_id] ) {
      this.subjects[node_id] = new BehaviorSubject<T[]>([]);
      soft_reload = true;
    }
    if (reload || soft_reload){
      if (node.children_count === 0 && !reload && !parent) {
        this.subjects[node.id].next([]);
      } else {
        this.formService.submit({id: node_id, expand: 'children,children.root_data'}, false).pipe(
          map(server_node => {
            server_node.children.forEach(node => node.parent = server_node.id);
            this.subjects[node_id].next(server_node.children);
            return server_node;
          })
        ).subscribe();
      }
    }
    return this.subjects[node_id].asObservable();
  }

  protected setInitialNode(node: Parent): void {
    node.children.forEach(child => child.parent = node.id);
    this.nestedDataSource.data = node.children;
  }

  protected reloadChildren(node: T, parent: boolean = false): void {
    this.getChildren(node, true, parent);
  }
}
