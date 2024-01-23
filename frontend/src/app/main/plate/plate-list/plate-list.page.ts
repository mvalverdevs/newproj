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
  search: string | undefined = undefined;

  async getRecipes(
    selectedCategory: number[] | undefined = undefined,
    search: string | undefined = undefined
    ){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();

    this.recipeService.recipeList({category: selectedCategory, search: search}).subscribe({
      next: (recipes) => {
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
    const query = event.target.value.toLowerCase();
    if (this.selectedCategory == undefined){
      this.getRecipes(undefined, query);
    }else{
      this.getRecipes([this.selectedCategory], query);
    }
  }

}
