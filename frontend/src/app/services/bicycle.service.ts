import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  currentBicycleId!: number;

  endPoint = "http://localhost:8080/api/bicycles";

  constructor(private httpClient: HttpClient) { }

  setCurrentBicycleId(id: number) {
    this.currentBicycleId = id;
  }

  getCurrentBicycleId(): number {
    return this.currentBicycleId;
  }

  getBicycles() {
    return this.httpClient.get(this.endPoint);
  }

  createBicycle(bicycle, blob) {
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  deleteBicycle(id: number) {
    return this.httpClient.delete(this.endPoint + `/${id}`);
  }

  updateBicycles(id: number, bicycle: any, blob) {
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("file", blob);

    return this.httpClient.put(this.endPoint+ `/${id}`, formData);
  }
}
