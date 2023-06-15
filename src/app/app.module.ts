import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TopBarModule } from './shared/modules/top-bar/top-bar.module';
import { PersistenceService } from './shared/services/persistence.service';
import { AuthInterseptor } from './shared/services/authInterseptor';
import { GlobalFeedModule } from './globalFeed/global-feed.module';
import { TagListComponent } from './shared/modules/tagList/components/tag-list/tag-list.component';
import { YourFeedModule } from './your-feed/your-feed.module';
import { TagFeedModule } from './tag-feed/tag-feed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(),
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      // trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      // traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
