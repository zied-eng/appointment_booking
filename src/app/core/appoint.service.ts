import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [];
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);

  constructor() {}

  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  createAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
    this.appointmentsSubject.next(this.appointments);
  }

  cancelAppointment(appointmentId: string): void {
    this.appointments = this.appointments.filter(a => a.id !== appointmentId);
    this.appointmentsSubject.next(this.appointments);
  }
}