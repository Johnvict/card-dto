import { CardData } from './interfaces';
import { createAction, props } from '@ngrx/store';


const INIT_CARD = '[CARD] Init';
const ADD_CARD = '[CARD] Add';
const DELETE_CARD = '[CARD] Delete';

export const InitializeCard = createAction(
	INIT_CARD,
	props<{data: CardData[]}>()
);

export const AddCard = createAction(
	ADD_CARD,
	props<CardData>()
);

export const DeleteCard = createAction(
	DELETE_CARD,
	props<{ index: number }>()
);

export const actions = { ADD_CARD, DELETE_CARD };