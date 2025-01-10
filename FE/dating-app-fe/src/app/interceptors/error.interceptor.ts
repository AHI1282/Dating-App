import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req)
    .pipe(
      // tap(data => {
      //   debugger
      //   // Do your success stuff in here
      // }),
      catchError(httpErrorResponse => {
        let errorMessage = '';
        const {error, statusText} = httpErrorResponse;
        if(error?.message) {
          errorMessage = error.message;
        } else {
          errorMessage = error;
        }

        toastrService.error(errorMessage, statusText);
        throw httpErrorResponse;
      })
    );
};
