import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { getFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';

import { reducers } from 'src/app/shared/modules/feed/store/reducers';
import { FeedService } from './services/feed.service';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([getFeedEffect]),
    StoreModule.forFeature('feed', reducers),
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
