import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

interface Driver {
  driver_name: string;
  driver_department: string;
  driver_licence: string;
  driver_isActive: boolean;
}

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent {
  driver: Driver = {
    driver_name: '',
    driver_department: 'food',
    driver_licence: '',
    driver_isActive: true,
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const observer: Observer<Object> = {
      next: (response) => {
        console.log('Driver added successfully', response);
        // Reset the form
        this.driver = {
          driver_name: '',
          driver_department: 'food',
          driver_licence: '',
          driver_isActive: true,
        };
      },
      error: (error) => {
        console.error('Error adding driver', error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    };

    this.http
      .post('http://localhost:8080/34082115/Durgka/api/v1/drivers', this.driver)
      .subscribe(observer);
  }
}
