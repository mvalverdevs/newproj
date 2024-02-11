import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { base64toBlob } from 'src/app/utils/functions';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent  implements OnInit {

  
  @Input() imageUrl: string | undefined = undefined;
  @Output() selectImage = new EventEmitter<Blob>();

  constructor() { }

  ngOnInit() {}

  selectNewImage(image: Blob) {
    this.selectImage.emit(image);
  }

  async takePicture() {
    try{

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      this.selectNewImage(
        base64toBlob(image.dataUrl!)
      );

    }catch {
      console.error('Error picking image');
    }
  }


}