import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { Injectable, InjectionToken, Inject } from '@angular/core';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(
		@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number = 30
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				'content-type': 'application/json',
				Accept: 'application/json'
			}
		});

		const timeoutValue = request.headers.get('timeout') || this.defaultTimeout;

		const timeoutValueNumeric = Number(timeoutValue);
		let timer = 0;
		timer += 1;

		if (!window.navigator.onLine) {
			return throwError('Please check your internet connection and try again');
		} else {
			return next.handle(request).pipe(timeout(timeoutValueNumeric), map((event: HttpEvent<any>) => {
				const inter = setInterval(() => {
					timer += 1;
					if (timer === 30) {
						timer = 0;
						clearInterval(inter);
					}
				}, 1000);
				if (event instanceof HttpResponse) {
					if (timer >= 30) {
						// this.notification.showToast('Request timed out!');
						throw(new Error('Request timed out! Check your network and try again'));
					}
					clearInterval(inter);
				}
				return event;
			}),
				catchError((error: HttpErrorResponse) => {
					console.log(error);
					if (error.error instanceof ErrorEvent) {
						return throwError(error.error.message);
					} else {
						if (error.status === 0) {
							return throwError('Please check your internet connection and try again');
						} else {
							return throwError('Request timeout. Please try again');
						}
					}
				})
			);
		}
	}
}
