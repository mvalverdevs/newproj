import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription, expand } from 'rxjs';
import { Recipe } from 'src/api/models';
import { RecipeService } from 'src/api/services';

@Component({
  selector: 'app-recipe-retrieve',
  templateUrl: 'recipe-retrieve.page.html',
  styleUrls: ['recipe-retrieve.page.scss']
})
export class RecipeDetailPage implements OnInit {

  routeSub: Subscription
  recipe: Recipe = {
    category: [],
    category_data: [],
    description: 'string',
    diners: 0,
    id: 0,
    image: 0,
    image_data: {
      id: 0,
      image: 'https://ionicframework.com/docs/img/demos/card-media.png'
    },
    ingredients: [],
    name: '',
    time: 0,
  }

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Sí',
      role: 'confirm',
      handler: () => {
        this._recipeService.recipeDestroy$Response({id: this.recipe.id}).subscribe({
          next: (response) => {
          },
          error: (e) => console.error(e),
          complete: () => {
            this._router.navigate(['/plates']);
          }
        });
      },
    },
  ];

  constructor(
    private _loadingCtrl: LoadingController,
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  async ngOnInit() {
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
    loading.present();
    // 🚩 Take id from url
    this.routeSub = this._route.params.subscribe(params => {
      // 🚩 Edit Mode and take the recipe from api
      if (params['id'] != undefined){
        this._recipeService.recipeRetrieve$Response({id: params['id'], expand: '~all'}).subscribe({
          next: (recipe) => {
            this.recipe = recipe.body;
          },
          error: (e) => console.error(e),
          complete: () => {
            loading.dismiss();
          }
        });
      }
    })
  }

  delete(event: any){

  }
}
