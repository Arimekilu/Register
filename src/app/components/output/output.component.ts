import {Component, OnInit} from '@angular/core';
import {Payment} from "../../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, from, Observable, ObservedValueOf, of} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  // @ts-ignore
  arrFbPayments: Payment[]
  arrFbPayments$: Observable<Payment[]> | undefined
  dateForOutputForm: FormGroup
  sum: Observable<number> | undefined

  constructor(
    private http: HttpClient,
    public dateService: DataService
  ) {
    this.dateForOutputForm = new FormGroup({
        date: new FormControl(new Date())
      })
  }

  ngOnInit(): void {
    this.dateService.getPaymentDay(new Date()).subscribe(res => {
      this.arrFbPayments = res
      this.arrFbPayments$ = of(res)
      this.sum = of(this.dateService.getPayDaySum(res))
    })
  }

  remove (id: string, date: Date) {
    if (id) {
      this.dateService.remove(id, date).subscribe(() => {
        this.arrFbPayments = this.arrFbPayments.filter(pay => pay.id !== id)
      })
      this.dateService.getPaymentDay(date).subscribe(res => {
        this.arrFbPayments$ = of(res)
        this.sum = of(this.dateService.getPayDaySum(res))
        console.log(res)
      })
    }
  }

  test() {
    this.arrFbPayments$?.subscribe(res => {
      console.log(res)})
    console.log(this.sum)

  }

  submit() {
    let date =  new Date(this.dateForOutputForm.value.date)
    console.log(date)
    let rusDate = this.dateService.getRusDate(date)
    console.log(rusDate)
    this.dateService.getPaymentDay(date).subscribe(res => {
      this.arrFbPayments$ = of(res)
      this.sum = of(this.dateService.getPayDaySum(res))
      console.log(res)
    })

  }
}
