import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class HelpersService {

	constructor() { }

	/**
	 * Format the expiry date to make it look more like a real date on card 08/21
	 * @param expiryDateInput number | string
	 */
	formatExpiryDate(expiryDateInput: number | string): string {
		expiryDateInput = String(expiryDateInput);
		expiryDateInput = expiryDateInput.replace("/", "");
		expiryDateInput = expiryDateInput.substr(0, 2) + "/" + expiryDateInput.substr(2);

		return expiryDateInput;
	}

	/**
	 * Formart card number to have dashes inbetween every four digits
	 * @param cardInput string
	 */
	formatCardNumber(cardInput: string = "", mockMaskedCard = false): string {
		cardInput = String(cardInput);
		cardInput = this.removeDashes(cardInput);
		cardInput = `_${cardInput}`;
		let formatedCardNumber = "";
		for (let i = 1; i < cardInput.length; i++) {
			formatedCardNumber +=
				i % 4 === 0 && i !== cardInput.length - 1
					? mockMaskedCard ? `${this.maskData(cardInput[i], i, cardInput.length)}` : `${cardInput[i]}-`
					: mockMaskedCard ? this.maskData(cardInput[i], i, cardInput.length) : cardInput[i];
		}

		return formatedCardNumber;
	}

	maskData(char: string, position: number, totalLength: number) {
		return position > 3  && position < (totalLength - 6) ? '*' : char; 
	}

	/**
	 * Remove the dashes to make the card number plain digits again
	 * @param cardInput string
	 */
	removeDashes(cardInput: string): string {
		for (let i = 1; i < cardInput.length; i++) {
			cardInput = cardInput.replace("-", "");
		}

		return cardInput;
	}
}