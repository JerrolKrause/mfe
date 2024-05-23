import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, TransferState, makeStateKey } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppStorageService, AuthenticationService } from '../services';

declare const process: any;

/** Node JS check for SSR */
const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  /**
   * Creates an instance of HttpInterceptorService.
   * @param appStorage - Service for accessing application storage.
   * @param transferState - Service for transferring state between server and client.
   * @param router - Router service for navigation.
   * @param route - ActivatedRoute service for accessing route information.
   */
  constructor(
    private appStorage: AppStorageService,
    private transferState: TransferState,
    private auth: AuthenticationService
  ) {}

  /**
   * Intercepts HTTP requests to add custom headers and handle responses.
   * @param req - The outgoing HTTP request.
   * @param next - The next interceptor in the chain.
   * @returns An observable of the HTTP event.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Handle transfer state between node and the browser
    if (!isNode && req.method === 'GET') {
      // Create a state key using the url
      const key = makeStateKey(req.url);
      // Look for a response for that state key in the transfer service
      const response = this.transferState.get(key, null);
      // If found return it from the store instead of making an http call
      if (response) {
        return of(new HttpResponse({ body: response, status: 200 }));
      }
    }

    // Create headers element
    const headers = new HttpHeaders(this.getHeaders());

    // Clone request, add headers
    const cloneReq = req.clone({ headers });

    // Return request, handle errors globally here
    return next.handle(cloneReq).pipe(
      tap((event) => {
        // If SSR is on and this is on the server/node and this is a successful get request,
        // store the result in transfer state to pass to the browser
        if (
          isNode &&
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 202)
        ) {
          this.transferState.set(makeStateKey(req.url), event.body);
        }
      }),
      catchError((error) => {
        // If forbidden or unauthorized error, end session
        if (
          error.status === STATUS_UNAUTHORIZED ||
          error.status === STATUS_FORBIDDEN
        ) {
          // Ends the user's session based on authentication failure.
          this.auth.logOut();
        }
        // Catch and rethrow error
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves custom headers for the HTTP request.
   * @returns An object containing the custom headers.
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    // If token present, add bearer token
    if (this.appStorage.token) {
      headers['Authorization'] = 'Bearer ' + this.appStorage.token;
    }
    return headers;
  }
}
