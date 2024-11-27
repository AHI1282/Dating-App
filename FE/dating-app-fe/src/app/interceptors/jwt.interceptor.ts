import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const spinnerService = inject(NgxSpinnerService);

  spinnerService.show(undefined, {
    type: 'line-spin-clockwise-fade',
    bdColor: 'rgba(255, 255, 255, 0)',
    color: '#333333'
  });

  if(accountService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.currentUser()?.token}`
      }
    })
  }

  return next(req).pipe(
    delay(1000),
    finalize(() => spinnerService.hide())
  );
};
