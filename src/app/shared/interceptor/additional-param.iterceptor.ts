import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessService } from '../../services/access.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private access: AccessService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      params: (req.params ? req.params : new HttpParams()).set(
        'p9',
        this.access.user ?? 0
      ),
    });

    return next.handle(newReq);
  }
}
