import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PopularTagService } from './services/popular-tag.service';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GetPopularTagEffect } from './store/effects/getPopularTags.effect';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagEffect]),
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagService],
})
export class PopularTagsModule {}
