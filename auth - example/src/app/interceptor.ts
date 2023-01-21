import { UserService } from './user.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url

        if (this.userService.isSignedIn()) {
            let accessToken = this.userService.getAuthToken();
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` }
            });
        }

        return next.handle(request);
    }
}