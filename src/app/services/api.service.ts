import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  health() {
    return this.http.get(`${this.base}/health`).pipe(
      catchError(this.handle)
    );
  }

  analyze(body: any) {
    return this.http.post(`${this.base}/predict`, body, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(catchError(this.handle));
  }

  private handle(err: HttpErrorResponse) {
    console.error('API error:', {
      url: err.url,
      status: err.status,
      message: err.message,
      error: err.error
    });
    return throwError(() => err);
  }
}
