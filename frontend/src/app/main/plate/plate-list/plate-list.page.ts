import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Recipe, RecipeCategory } from 'src/api/models';
import { RecipeCategoryService, RecipeService } from 'src/api/services';

@Component({
  selector: 'app-plates',
  templateUrl: 'plate-list.page.html',
  styleUrls: ['plate-list.page.scss']
})
export class PlateListPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private recipeCategoryService: RecipeCategoryService,
    private recipeService: RecipeService
  ) {}

  async ngOnInit(){
    // 🚩 Show loading
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();

    // 🚩 Obtaining recipeCategory list
    this.recipeCategoryService.recipeCategoryList().subscribe({
      next: (recipeCategories) => {
        if (recipeCategories.results != undefined){
          this.recipeCategories = recipeCategories.results;
          console.log(this.recipeCategories);
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        loading.dismiss();
      }
    });

    // 🚩 Obtaining recipe list
    this.getRecipes();
  }

  recipeCategories: RecipeCategory[] = [];
  recipes: Recipe[] = []
  selectedCategory: number | undefined = undefined;

  async getRecipes(filter: number[] | undefined = undefined){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();

    this.recipeService.recipeList({category: filter}).subscribe({
      next: (recipes) => {
        if (recipes.results != undefined){
          this.recipes = recipes.results;
          console.log(this.recipeCategories);
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        loading.dismiss();
      }
    });

    // Selection category
    if (filter != undefined){
      this.selectedCategory = filter[0];
    }

  }

}
