import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  endPoint = "http://localhost:8080/api/bicycles";

  constructor(private httpClient: HttpClient) { }

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
}
