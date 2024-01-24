import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pagesWithTabs = [
    '/plates'
  ]
  showTabs = true

  constructor(
    private _router: Router
  ) {
    // Detect the current route to show tab bar or not
    this.showTabs = this.pagesWithTabs.includes(this._router.url)
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showTabs = this.pagesWithTabs.includes(this._router.url);
      }
    });
  }
}
