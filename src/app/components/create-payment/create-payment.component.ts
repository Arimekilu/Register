import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Payment} from "../../interfaces/interfaces";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  CreatePaymentForm: FormGroup

  constructor(public dataService: DataService) {
    this.CreatePaymentForm = new FormGroup({
        value: new FormControl('', Validators.required),
        date: new FormControl(),
        type: new FormControl('', Validators.required),
        comment: new FormControl()
      }
    )
  }

  submit() {
    console.log(this.CreatePaymentForm.get('value'))
    if (this.CreatePaymentForm.invalid) {
      return
    }
    const date = (this.CreatePaymentForm.value.date ? new Date(this.CreatePaymentForm.value.date) : new Date())
    const newPayment: Payment = {
      value: this.CreatePaymentForm.value.type === '+' ? this.CreatePaymentForm.value.value : -this.CreatePaymentForm.value.value,
      date: this.CreatePaymentForm.value.date ? this.CreatePaymentForm.value.date : new Date(),
      comment: this.CreatePaymentForm.value.comment
    }
    this.dataService.setPayment(newPayment, date).subscribe(() => {
      this.CreatePaymentForm.get('value')?.reset()
      this.CreatePaymentForm.get('type')?.reset()
    })
  }

  ngOnInit(): void {
  }
}
