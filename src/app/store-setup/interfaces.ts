
export interface CardData {
	cardNumber: number;
	cardHolder: string;
	expiryDate: Date;
	securityCode?: string;
	amount:	number;
}

export interface AppState {
	readonly cardData: CardData[];
}
