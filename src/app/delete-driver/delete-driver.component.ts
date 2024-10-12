import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Driver {
  _id: string;
  driver_id: string;
  driver_name: string;
}

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css'],
})
export class DeleteDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriverId: string = '';

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

  deleteDriver() {
    if (!this.selectedDriverId) {
      console.error('No driver selected');
      return;
    }

    this.http
      .delete(
        `http://localhost:8080/34082115/Durgka/api/v1/drivers/${this.selectedDriverId}`
      )
      .subscribe({
        next: (response) => {
          console.log('Driver deleted successfully', response);
          // Remove the deleted driver from the list
          this.drivers = this.drivers.filter(
            (driver) => driver.driver_id !== this.selectedDriverId
          );
          this.selectedDriverId = '';
        },
        error: (error) => {
          console.error('Error deleting driver:', error);
        },
      });
  }
}
