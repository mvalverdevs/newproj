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

  recipeCategories: RecipeCategory[] = [];
  recipes: Recipe[] = []
  selectedCategory: number | undefined = undefined;
  search: string | undefined = undefined;

  constructor(
    private _loadingCtrl: LoadingController,
    private _recipeCategoryService: RecipeCategoryService,
    private _recipeService: RecipeService
  ) {}

  async ngOnInit(){
    // 🚩 Show loading
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();

    // 🚩 Obtaining recipeCategory list
    this._recipeCategoryService.recipeCategoryList().subscribe({
      next: (recipeCategories) => {
        if (recipeCategories.results != undefined){
          this.recipeCategories = recipeCategories.results;
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

  async getRecipes(
    selectedCategory: number[] | undefined = undefined,
    search: string | undefined = undefined
    ){
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();

    this._recipeService.recipeList({expand: '~all', category: selectedCategory, search: search}).subscribe({
      next: (recipes) => {
        console.log(recipes)
        if (recipes.results != undefined){
          this.recipes = recipes.results;
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        loading.dismiss();
      }
    });

    // Selection category
    if (selectedCategory != undefined){
      if (selectedCategory![0] == this.selectedCategory){
        this.selectedCategory = undefined;
      }else{
        this.selectedCategory = selectedCategory![0];
      }
    }

  }

  handleSearch(event: any){
    console.log(event);
    const query = event.target.value.toLowerCase();
    if (this.selectedCategory == undefined){
      this.getRecipes(undefined, query);
    }else{
      this.getRecipes([this.selectedCategory], query);
    }
  }

}
