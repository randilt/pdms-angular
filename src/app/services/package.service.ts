import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://34.129.56.123:8080/34082115/Durgka/api/v1/packages';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // 5. Insert a new package (POST)
  addPackage(packageData: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, packageData, {
      headers: this.headers,
    });
  }

  // 6. List all packages (GET)
  getPackages(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  // 7. Delete package by ID (DELETE)
  deletePackage(packageId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${packageId}`);
  }

  // 8. Update package destination by ID (PATCH)
  updatePackage(packageData: any): Observable<any> {
    return this.http.patch(`${baseUrl}/update`, packageData, {
      headers: this.headers,
    });
  }
}
