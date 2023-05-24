import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { reducer } from './store/reducers';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducer),
  ],
  declarations: [RegisterComponent],
})
export class AuthModule {}
