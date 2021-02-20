import { PaymentService } from './../../services/payment.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as CardActions from './../../store-setup/card.actions';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-setup/interfaces';
import { CardData } from './../../store-setup/interfaces';



@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.component.html',
	styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent {

	minMonth = "06-2021"
	maxMonth = "12-2030"
	paymentForm: FormGroup = new FormGroup({
		cardNumber: new FormControl("", [Validators.required]),
		cardHolder: new FormControl("", [Validators.required]),
		expiryDate: new FormControl("", [Validators.required, Validators.pattern(/^((0[1-9])|(1[0-2]))[\/\.\-]*((2[1-9])|(3[0]))$/)]),
		securityCode: new FormControl(""),
		amount: new FormControl(500, [Validators.required, Validators.min(1)]),
	});


	cardData: Observable<CardData[]>;
	constructor(
		private paymentService: PaymentService,
		private store: Store<AppState>,
		) {
			this.cardData = store.select('cardData');
		}

	dateEntered(ev: any) {
		let expiryDateInput = this.paymentForm.value.expiryDate;
		expiryDateInput = expiryDateInput.replace("/", "");
		expiryDateInput = expiryDateInput.substr(0, 2) + "/" + expiryDateInput.substr(2);

		this.paymentForm.patchValue({ expiryDate: expiryDateInput });
	}

	submitPayment() {
		console.log(this.paymentForm.value);
		this.paymentService.post(this.paymentForm.value).subscribe( data => {
			this.store.dispatch(CardActions.AddCard(data));
		}, error => console.log(error));
	}

	formatCardNumber(event: any) {

		let cardInput = this.paymentForm.value.cardNumber;
		if (cardInput) {
			for (let i = 1; i < cardInput.length; i++) {
				cardInput = cardInput.replace("-", "");
			}
			cardInput = `_${cardInput}`;
			let toks = "";
			for (let i = 1; i < cardInput.length; i++) {
				toks +=
					i % 4 === 0 && i !== cardInput.length - 1
						? `${cardInput[i]}-`
						: cardInput[i];
			}

			this.paymentForm.patchValue({ cardNumber: toks });
		}
	}

}
