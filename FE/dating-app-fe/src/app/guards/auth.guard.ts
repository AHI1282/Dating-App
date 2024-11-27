import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if(!accountService.currentUser()) {
    router.navigateByUrl('/');
    toastrService.error('You shall not pass!');
    return false;
  }

  return true;
};
