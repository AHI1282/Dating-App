import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req)
    .pipe(
      catchError(httpErrorResponse => {
        const {error, statusText} = httpErrorResponse;
        toastrService.error(error?.message, statusText);
        throw httpErrorResponse;
      })
    );
};
