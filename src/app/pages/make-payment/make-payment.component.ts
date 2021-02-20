import { NotificationService } from './../../services/notification.service';
import { PaymentService } from './../../services/payment.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as CardActions from './../../store-setup/card.actions';

import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-setup/interfaces';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';



@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.component.html',
	styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent {

	paymentForm: FormGroup = new FormGroup({
		cardNumber: new FormControl("", [Validators.required, Validators.maxLength(24), Validators.minLength(16)]),
		cardHolder: new FormControl("", [Validators.required, Validators.minLength(5)]),
		expiryDate: new FormControl("", [Validators.required, Validators.maxLength(5), Validators.pattern(/^((0[1-9])|(1[0-2]))[\/\.\-]*((2[1-9])|(3[0]))$/)]),
		securityCode: new FormControl(""),
		amount: new FormControl("", [Validators.required, Validators.min(1)]),
	});


	isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
	constructor(
		private paymentService: PaymentService,
		private store: Store<AppState>,
		private notificationService: NotificationService,
		private helpersService: HelpersService,
		private router: Router
	) {

	}

	formatExpiryDate(ev: any) {
		this.paymentForm.patchValue({ expiryDate: this.helpersService.formatExpiryDate(this.paymentForm.value.expiryDate) });
	}


	formatCardNumber(event: any) {
		this.paymentForm.patchValue({
			cardNumber: this.helpersService.formatCardNumber(this.paymentForm.value.cardNumber)
		});
	}

	submitPayment() {
		this.isLoading.next(true);
		this.paymentForm.patchValue({
			cardNumber: this.helpersService.removeDashes(this.paymentForm.value.cardNumber)
		})

		this.paymentService.post(this.paymentForm.value).subscribe(data => {
			this.store.dispatch(CardActions.AddCard(data));
			this.notificationService.showToast('Payment successful');
			this.isLoading.next(false);
			this.router.navigate(['/']);
		}, error => {
			this.isLoading.next(false);
			this.notificationService.showToast('Sorry, an error occured while processing your request')
		});
	}
}
