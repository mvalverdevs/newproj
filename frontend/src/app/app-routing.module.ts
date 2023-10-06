import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SchedulePage} from './pages/schedule/schedule.page'
import { CartPage } from './pages/cart/cart.page';
import { LoginPage } from './pages/forms/login/login.page';
import { RegisterPage } from './pages/forms/register/register.page';
import { AccountPage } from './pages/account/account.page';
import { CreateMealPage } from './components/meal/form/meal.page';
import { FoodPage } from './pages/forms/food/food.page';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/forms/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/forms/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'meal',
    loadChildren: () => import('./components/meal/form/meal.module').then( m => m.CreateMealPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/forms/food/food.module').then( m => m.FoodPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: SchedulePage },
      { path: 'schedule', component: SchedulePage },
      { path: 'cart', component: CartPage },
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'account', component: AccountPage },
      { path: 'meal', component: CreateMealPage },
      { path: 'food', component: FoodPage },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
