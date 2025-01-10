import { Component, inject, input, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { IUserModel } from '../../models/user.model';
import { ILoginModel } from '../../models/login.model';
import { ToastrService } from 'ngx-toastr';
import {  NgIf } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, BsDatepickerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);

  accountsService = inject(AccountService);
  toastr = inject(ToastrService);
  router = inject(Router);

  usersInput = input.required<IUserModel[]>();

  cancelRegister = output<boolean>();

  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      gender: ['male'],
      userName: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues = (matchTo: string): ValidatorFn => {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register = () => {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});

    this.accountsService.register(this.registerForm.value)
      .subscribe({
        next: () => this.router.navigateByUrl('/members')
      })
  }

  onCancel = () => {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}
