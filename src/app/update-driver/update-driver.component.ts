import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Driver {
  _id: string;
  driver_id: string;
  driver_name: string;
  driver_department: string;
  driver_licence: string;
  driver_isActive: boolean;
}

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css'],
})
export class UpdateDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;

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
        },
        error: (error) => {
          console.error('Error fetching drivers:', error);
        },
      });
  }

  onDriverSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.selectedDriver =
      this.drivers.find((driver) => driver._id === selectedId) || null;
  }

  updateDriver() {
    if (!this.selectedDriver) return;

    const updateData = {
      id: this.selectedDriver._id,
      driver_licence: this.selectedDriver.driver_licence,
      driver_department: this.selectedDriver.driver_department,
      driver_isActive: this.selectedDriver.driver_isActive,
    };

    this.http
      .patch('http://localhost:8080/34082115/Durgka/api/v1/drivers', updateData)
      .subscribe({
        next: (response) => {
          console.log('Driver updated successfully', response);
          // Optionally, refresh the drivers list
          this.fetchDrivers();
        },
        error: (error) => {
          console.error('Error updating driver:', error);
        },
      });
  }
}
