import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getPopularTagsAction } from '../../store/actions/getPopularTag.action';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/PopularTag.type';
import {
  isLoadingSelector,
  popularTagsSelector,
  errosSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  //
  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  errors$: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initValues();
    this.fetchData();
  }

  initValues() {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.errors$ = this.store.pipe(select(errosSelector));
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction());
  }
}
