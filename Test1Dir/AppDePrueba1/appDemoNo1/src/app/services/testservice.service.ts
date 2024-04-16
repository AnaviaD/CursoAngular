import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService {

  private apiUrl: string = "https://localhost:7206/WeatherForecast";

  constructor(private httpClient: HttpClient)
  {

  }

  testApi(){
    return this.httpClient.get(this.apiUrl);
  }
}
