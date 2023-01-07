import {Component, OnInit} from '@angular/core';
import {Payment} from "../../interfaces/interfaces";
import {DataService} from "../../services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  // @ts-ignore
  arrFbPayments: Payment[] = []
  arrFbPayments$: Observable<Payment[]> | undefined
  dateForOutputForm: FormGroup
  sum: Observable<number> | undefined
  message: undefined | string

  constructor(
    public dateService: DataService
  ) {
    this.dateForOutputForm = new FormGroup({
      date: new FormControl(new Date())
    })
  }

  ngOnInit(): void {
    this.dateService.getPaymentDay(new Date()).subscribe((res) => {
      this.arrFbPayments = res
      this.arrFbPayments$ = of(res)
      this.sum = of(this.dateService.getPayDaySum(res))
    }, error => {
      console.log(error)
      this.message = 'Платежей в этот день нет'
    })
  }

  remove(id: string, date: Date) {
    if (id) {
      this.dateService.remove(id, date).subscribe(() => {
        this.arrFbPayments = this.arrFbPayments.filter(pay => pay.id !== id)
      })
      this.dateService.getPaymentDay(date).subscribe(res => {
        this.arrFbPayments$ = of(res)
        this.sum = of(this.dateService.getPayDaySum(res))
      })
    }
    this.submit()
  }

  test() {
    this.arrFbPayments$?.subscribe(res => {
      console.log(res)
    })
    console.log(this.sum)

  }

  submit() {
    this.message = undefined
    this.sum = undefined
    this.arrFbPayments = []
    this.arrFbPayments$ = of(this.arrFbPayments)
    let date = new Date(this.dateForOutputForm.value.date)
    this.dateService.getPaymentDay(date).subscribe(
      (res) => {
        this.arrFbPayments$ = of(res)
        this.sum = of(this.dateService.getPayDaySum(res))
      },
      error => {
        console.log(error)
        this.message = 'Платежей в этот день нет'
      })
  }
}
