import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CardData } from "../store-setup/interfaces";

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	sheetURL = environment.sheetURL;
	cardData: CardData[] = [];

	constructor(private http: HttpClient) {
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

	/**
	 * Instantiate the loading of card data from API
	 */
	preloadData(){
		this.get().subscribe(data => {

			console.log(data);

			this.cardData = [...data];
		}, error => {
			console.log(error);
		});
	}
}