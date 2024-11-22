import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);


  isRequired(field: 'email' | 'password'): boolean {
    const control = this.form.get(field);
    return control?.hasValidator(Validators.required) ?? false;
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;
    
    try {
      const { email, password } = this.form.value;

      if (!email || !password) console.log({ email, password });
  
      await this._authService.signUp({ email: email || '', password: password||'' }); 

      toast.success('Usuario creado Correctamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ocurrio un error')
    }
    
  }  
}
