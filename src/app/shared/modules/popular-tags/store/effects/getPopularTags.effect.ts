import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {
  getPopularTagsAction,
  getPopularTagsActionFailure,
  getPopularTagsActionSuccess,
} from '../actions/getPopularTag.action';
import { PopularTagService } from '../../services/popular-tag.service';
import { PopularTagType } from 'src/app/shared/types/PopularTag.type';

@Injectable()
export class GetPopularTagEffect {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagService
  ) {}

  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsActionSuccess({ popularTags });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getPopularTagsActionFailure());
          })
        );
      })
    )
  );
}
