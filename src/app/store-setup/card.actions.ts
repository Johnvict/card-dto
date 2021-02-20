import { CardData } from './interfaces';
import { createAction, props } from '@ngrx/store';


const ADD_CARD = '[CARD] Add';
const DELETE_CARD = '[CARD] Delete';

export const AddCard = createAction(
	ADD_CARD,
	props<CardData>()
);

export const DeleteCard = createAction(
	DELETE_CARD,
	props<{ index: number }>()
);

export const actions = { ADD_CARD, DELETE_CARD };