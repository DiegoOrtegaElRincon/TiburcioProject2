import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { PhotoService } from '../services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.page.html',
  styleUrls: ['./update-car.page.scss'],
})
export class UpdateCarPage implements OnInit {

  carUpdateForm: FormGroup;
  car: any;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.carUpdateForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.carUpdateForm = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      year: ['', [Validators.required, Validators.min(1900)]]
    });

    const id = this.carService.currentCarId;

    this.carService.getCarById(id).subscribe(
      (carData: any) => {
        this.car = carData;
        this.carUpdateForm.setValue({
          brand: carData.brand,
          model: carData.model,
          year: carData.year
        });
      },
      (error) => {
        console.error('Error al cargar los datos del carro', error);
        // Maneja el error apropiadamente, por ejemplo, mostrando un mensaje al usuario.
      }
    );
  }

  get errorControl() {
    return this.carUpdateForm.controls;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {

    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.carUpdateForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.carService.updateCar(this.carService.currentCarId, this.carUpdateForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/car-list");
      })
    }
  }

}
