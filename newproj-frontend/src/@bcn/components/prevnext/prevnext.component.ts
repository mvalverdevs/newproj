import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PrevNextEntity, PrevnextService} from "../../services/prevnext.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-prevnext',
  templateUrl: './prevnext.component.html',
  styleUrls: ['./prevnext.component.scss']
})
export class PrevNextComponent implements OnInit {

  /**
   * Stores the entity type of the current element view
   */
  @Input() entityType: string;

  /**
   * Id of the current entity
   */
  @Input() entityId: number;

  /**
   * When move to the next or prev, it emites an event with the entity id to go
   */
  @Output() moveTo: EventEmitter<PrevNextEntity>;

  public initialized = false;


  constructor(
    public prevNextService: PrevnextService
  ) {
    this.moveTo = new EventEmitter<PrevNextEntity>();
  }

  ngOnInit() {
    this.prevNextService.init(() => this.initialized = true);
  }

  next(): void {
    this.prevNextService.next(this.entityId).pipe(
      map(element => this.moveTo.emit(element))
    ).subscribe();
  }

  prev(): void {
    this.prevNextService.prev(this.entityId).pipe(
      map(element => this.moveTo.emit(element))
    ).subscribe();
  }
}
