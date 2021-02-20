import { CardData } from './interfaces';
import * as CardActions from './card.actions';
import { Action, createReducer, on } from '@ngrx/store';

const initialState: CardData[] = [];


const cardDataReducer = createReducer(
	initialState,
	on(CardActions.InitializeCard, (state, data) => {
		let initialData = [...data.data];
		return initialData;
	}),
	on(CardActions.AddCard, (state, data) => {
		let newData = [...state, data.data];
		console.log(data);
		return newData;
		// return state;
	}),
	on(CardActions.DeleteCard, (state, data) => {
		let newState: CardData[] = [...state];
		newState.splice(data.index, 1);
		return newState;
	})
);

export function reducer(state: CardData[] = [], action: Action) {
	return cardDataReducer(state, action);
}

