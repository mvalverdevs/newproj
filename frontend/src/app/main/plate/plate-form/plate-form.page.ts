import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/api/services';
import { LoadingController } from '@ionic/angular';
import { base64toBlob } from 'src/app/utils/functions';

@Component({
  selector: 'app-plate-edit',
  templateUrl: 'plate-form.page.html',
  styleUrls: ['plate-form.page.scss']
})
export class PlateFormPage implements OnInit{

  recipeForm: FormGroup;
  routeSub: Subscription;
  selectedImage = ''

  constructor(
    private _loadingCtrl: LoadingController,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService,
  ) {
    // 🚩 Inicite form
    this.recipeForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      diners: [0, Validators.min(1)],
      time: [0],
      image: ['']
    });
  }

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
        this._recipeService.recipeRetrieve({id: params['id']}).subscribe({
            next: (recipe) => {
              // Add data to form
              this.recipeForm.patchValue(recipe);
            },
            error: (e) => console.error(e),
            complete: () => {
              loading.dismiss();
            }
          }
        )
      }
    });
    loading.dismiss();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.recipeForm.patchValue({
      image: base64toBlob(image.dataUrl!)
    });
    this.selectedImage = image.dataUrl!
  }

  async submit(){
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();
    const recipe = this.recipeForm.value as Recipe
    this._recipeService.recipeCreate$FormData$Response({body: recipe}).subscribe({
      next: (response) => {
      },
      error: (e) => 
      console.error(e),
      complete: () => {
        loading.dismiss();
        this._router.navigate(['/plates']);
      }
    })
  }
}
