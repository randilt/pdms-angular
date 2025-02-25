import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Package {
  package_id?: string;
  package_title: string;
  package_weight: number;
  package_destination: string;
  description?: string;
  isAllocated: boolean;
  driver_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private apiUrl = 'http://localhost:8080/34082115/Durgka/api/v1/packages';

  constructor(private http: HttpClient) {}

  addPackage(packageData: Package): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, packageData);
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  // Add more methods as needed (e.g., updatePackage, deletePackage)
}
