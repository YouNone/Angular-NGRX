import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionType';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ username: string; email: string; password: string }>()
);
