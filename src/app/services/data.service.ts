import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Payment } from '../interfaces/interfaces';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment[]> {
    return this.http.get(`${environment.fbDataBaseUrl}/payments.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  getPaymentDay(date: Date): Observable<Payment[]> {
    return this.http
      .get(
        `${environment.fbDataBaseUrl}/payments/${this.getRusDate(date)}.json`
      )
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }));
        })
      );
  }

  setPayment(payment: Payment, date: Date): Observable<Payment> {
    return this.http
      .post(
        `${environment.fbDataBaseUrl}/payments/${this.getRusDate(date)}/.json`,
        payment
      )
      .pipe(
        map((response: any) => {
          return {
            ...payment,
            id: response.name,
            date: new Date(payment.date),
          };
        })
      );
  }

  getRusDate(date: Date) {
    const day = date.getDate();
    const mont = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '-' + mont + '-' + year;
  }

  public getPayDaySum(Payment: Payment[]) {
    return Payment?.reduce((sum, current) => sum + +current.value, 0);
  }

  remove(id: string, date: Date): Observable<void> {
    return this.http.delete<void>(
      `${environment.fbDataBaseUrl}/payments/${this.getRusDate(
        date
      )}/${id}.json`
    );
  }
}
