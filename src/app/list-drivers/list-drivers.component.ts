import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Driver {
  _id: string;
  driver_id: string;
  driver_name: string;
  driver_department: string;
  driver_licence: string;
  driver_isActive: boolean;
  driver_createdAt: string;
}

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css'],
})
export class ListDriversComponent implements OnInit {
  drivers: Driver[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.http
      .get<Driver[]>('http://localhost:8080/34082115/Durgka/api/v1/drivers')
      .subscribe({
        next: (data) => {
          this.drivers = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching drivers:', err);
          this.error = 'Failed to load drivers. Please try again later.';
          this.loading = false;
        },
      });
  }
}
