import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://34.129.56.123:8080/34082115/Durgka/api/v1/drivers';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // 1. Add a new driver (POST)
  addDriver(driverData: any): Observable<any> {
    return this.http.post(`${baseUrl}`, driverData, { headers: this.headers });
  }

  // 2. List all drivers (GET)
  getDrivers(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  // 3. Delete driver by ID (DELETE)
  deleteDriver(driverId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${driverId}`);
  }

  // 4. Update driver license and department by ID (PATCH)
  updateDriver(driverData: any): Observable<any> {
    return this.http.patch(`${baseUrl}`, driverData, { headers: this.headers });
  }
}
