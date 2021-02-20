
export interface CardData {
	cardNumber: number | string;
	cardHolder: string;
	expiryDate: Date;
	securityCode?: string;
	amount:	number;
}

export interface AppState {
	readonly cardData: CardData[];
}
