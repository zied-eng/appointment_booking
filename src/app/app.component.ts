import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from './core/appoint.service';
import { v4 as uuid } from 'uuid';

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  service: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

 
export class AppComponent {
  appointmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      service: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        id: uuid(),
        date: this.appointmentForm.get('date')?.value,
        time: this.appointmentForm.get('time')?.value,
        name: this.appointmentForm.get('name')?.value,
        email: this.appointmentForm.get('email')?.value,
        phone: this.appointmentForm.get('phone')?.value,
        service: this.appointmentForm.get('service')?.value
      };

      this.appointmentService.createAppointment(appointment);
      this.appointmentForm.reset();
    }
  }
  
}


