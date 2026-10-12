import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.startsWith('/api/')) {
    return next(request.clone({ url: `${environment.apiBaseUrl}${request.url.slice(4)}` }));
  }
  return next(request);
};
