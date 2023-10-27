import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  cars: any = [];

  constructor(private CarService: CarService, private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getAllCars();
  }

  getAllCars() {
    this.CarService.getCars().subscribe(cars => {
      console.log(cars);
      this.cars = cars;
    })
  }

  addCar() {
    this.router.navigateByUrl("/add-car");
  }

  updateCar(id: number) {
    this.CarService.currentCarId = id;
    this.router.navigate(["/update-car"]);
  }

  deleteCar(id: number) {
    this.CarService.deleteCar(id).subscribe(() => {
      this.getAllCars()
    })
    this.getAllCars()
  }
}

