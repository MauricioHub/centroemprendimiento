import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './autenticar';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];