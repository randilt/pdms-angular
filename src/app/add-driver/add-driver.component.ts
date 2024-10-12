import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent {
  driver = {
    driver_name: '',
    driver_department: 'food',
    driver_licence: '',
    driver_isActive: true,
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http
      .post('http://localhost:8080/34082115/Durgka/api/v1/drivers', this.driver)
      .subscribe(
        (response) => {
          console.log('Driver added successfully', response);
          // Reset the form
          this.driver = {
            driver_name: '',
            driver_department: 'food',
            driver_licence: '',
            driver_isActive: true,
          };
          // You can add a success message or redirect here
        },
        (error) => {
          console.error('Error adding driver', error);
          // You can add error handling here (e.g., displaying an error message)
        }
      );
  }
}
