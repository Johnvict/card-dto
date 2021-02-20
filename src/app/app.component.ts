import { NotificationService } from './services/notification.service';
import { NavigationEnd, Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState, CardData } from './store-setup/interfaces';
import { Store } from '@ngrx/store';

import * as CardActions from './store-setup/card.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'card-dto';
	cardData: Observable<CardData[]>;
	isHomeUrl = false;
	isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
	indexToDelete: number = -1;
	constructor(
		private paymentService: PaymentService,
		private store: Store<AppState>,
		private router: Router,
		private notificationService: NotificationService
	) {
		this.routerEvent();
		this.cardData = this.store.select('cardData');
	}

	routerEvent() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				console.log(event.url);
				this.isHomeUrl = event.url == '/' || event.url == '' ? true : false;
			}
		});
	}

	deleteCardData(index: number) {
		this.indexToDelete = index;
		this.isLoading.next(true);
		this.paymentService.delete(index).subscribe( _ => {
			this.indexToDelete = -1;
			this.isLoading.next(false);
			this.store.dispatch(CardActions.DeleteCard({index}));
			this.notificationService.showToast('Card Data deleted successfully');
		}, error => {
			this.indexToDelete = -1;
			this.isLoading.next(false);
			this.notificationService.showToast('Ooops! An error occured while processing your request')
		});
	}
}
