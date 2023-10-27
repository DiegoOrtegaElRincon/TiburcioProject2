import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  currentCarId!: number;

  endPoint = "http://localhost:8080/api/car";

  constructor(private httpClient: HttpClient) { }

  setCurrentCarId(id: number) {
    this.currentCarId = id;
  }

  getCurrentCarId(): number {
    return this.currentCarId;
  }

  getCarById(id: number) {
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  getCars() {
    return this.httpClient.get(this.endPoint);
  }

  createCar(car, blob) {
    let formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  deleteCar(id: number) {
    return this.httpClient.delete(this.endPoint + `/${id}`);
  }

  updateCar(id: number, car: any, blob) {
    let formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("file", blob);

    return this.httpClient.put(this.endPoint + `/${id}`, formData);
  }
}
