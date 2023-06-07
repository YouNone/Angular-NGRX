import { createReducer, on, Action } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { FeedStateInterface } from '../types/feedState.interface';
import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from './actions/getFeed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    getFeedActionSuccess,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })
  ),

  on(
    getFeedActionFailure,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),

  on(routerNavigationAction, (): FeedStateInterface => initialState)
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
