import { CardData } from './interfaces';
import * as CardActions from './card.actions';
import { Action, createReducer, on } from '@ngrx/store';

const initialState: CardData[] = [];


const cardDataReducer = createReducer(
	initialState,
	on(CardActions.AddCard, (state, data) => [...state, data]),
	on(CardActions.DeleteCard, (state, data) => {
		let newState: CardData[] = [...state].splice(data.index, 1);
		return newState;
	})
);

export function reducer(state: CardData[] = [], action: Action) {
	return cardDataReducer(state, action);
}
