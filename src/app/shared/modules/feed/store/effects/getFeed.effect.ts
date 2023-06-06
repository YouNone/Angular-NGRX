import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FeedService } from '../../services/feed.service';
import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from '../actions/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class getFeedEffect {
  constructor(private actions$: Actions, private feedService: FeedService) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedActionSuccess({ feed });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFeedActionFailure());
          })
        );
      })
    )
  );
}
