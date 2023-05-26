import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.actions';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  isSubmitting: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    console.log('initializeForm');
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initializeValues(): void {
    this.isSubmitting = this.store.pipe(select(isSubmittingSelector));
    console.log('isSubmitting', this.isSubmitting);
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    this.store.dispatch(registerAction(this.form.value));
    this.authService
      .register(this.form.value)
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log('currentUser', currentUser);
      });
  }
}
