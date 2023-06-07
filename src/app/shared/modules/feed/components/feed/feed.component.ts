import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { getFeedAction } from '../../store/actions/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
// import { parseUrl } from 'query-string/base';
import queryString from 'query-string';

import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscribtion$: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.intitializeListeners();
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  intitializeListeners() {
    this.queryParamsSubscribtion$ = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const strignifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${strignifiedParams}`;
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscribtion$.unsubscribe();
  }
}
