import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BCNThemeService {
  // Main Color
  mainColorChanged$: Observable<string>;
  private mainColorChanged = new BehaviorSubject<string>('#00838f');

  constructor() {
    this.mainColorChanged$ = this.mainColorChanged.asObservable();
  }

  changeTheme(newColor: string): void{
    this.mainColorChanged.next('theme_' + newColor);
  }

  resetTheme(): void{
    this.mainColorChanged.next('');
  }
  
}
