import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInService } from '../services/log-in.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private  loginService : LogInService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   let currentUser = this.loginService.currentEmployee;
    return next.handle(request);
  }
}
