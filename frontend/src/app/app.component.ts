import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { User } from './api/models';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  hideTabBar = false;
  closed$ = new Subject<any>();
  @ViewChild('tabsElement', { static: false }) tabsElement: IonTabs;
  
  pagesNoTabs = [
    '/login',
    '/register'
  ]

  tabs:any[] = [
    {
      url: "schedule",
      icon: "calendar-clear-outline",
      iconSelected: "calendar-clear"
    },
    {
      url: "search",
      icon: "search-outline",
      iconSelected: "search"
    },
    {
      url: "meal",
      icon: "add-outline",
      iconSelected: "add"
    },
    {
      url: "food",
      icon: "basket-outline",
      iconSelected: "basket"
    },
    {
      url: "account",
      icon: "person-circle-outline",
      iconSelected: "person-circle"
    },
  ]
  selectedTabName = this.tabs[0].url

  setCurrentTab() {
    this.selectedTabName = this.tabsElement.getSelected();
  }
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      event = event as NavigationEnd
      if (this.pagesNoTabs.includes(event.url)) {
        this.hideTabBar = true;
      }else{
        this.hideTabBar = false;
      }
    });
  }

}
