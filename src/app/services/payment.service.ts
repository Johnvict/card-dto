import { HelpersService } from './helpers.service';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppState, CardData } from "./../store-setup/interfaces";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as CardActions from './../store-setup/card.actions';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	sheetURL = environment.sheetURL;
	cardData: CardData[] = [];

	constructor(
		private http: HttpClient,
		private store: Store<AppState>,
		private helpersService: HelpersService
	) {
		this.preloadData();
	}


	/**
	 * Posts card data online and set the data to the state
	 * @param data CardData
	 */
	post(data: CardData): Observable<CardData> {
		return this.http.post<CardData>(this.sheetURL, data);
	}

	/**
	 * GET the existing card data from API
	 */
	get(): Observable<CardData[]> {
		return this.http.get<CardData[]>(this.sheetURL);
	}

	delete(index: number): Observable<CardData> {
		return this.http.delete<CardData>(`${this.sheetURL}/${index}`);
	}

	/**
	 * Instantiate the loading of card data from API
	 */
	preloadData() {
		this.get()
			.pipe( /** We need to reformat the card number to make it readable */
				map(rawData => rawData.map(each => ({ ...each, cardNumber: this.helpersService.formatCardNumber(String(each.cardNumber), true) })))
			).subscribe(data => {

				console.log(data);
				this.store.dispatch(CardActions.InitializeCard({ data: data }));
			}, error => {
				console.log(error);
			});
	}
}