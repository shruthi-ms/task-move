import { Injectable, HostBinding, Input, HostListener } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/abstract_emitter';
import { catchError , tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {

  getAllData = 'http://localhost:8000/';
  getData = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllSheetData(): Observable<any> {
    return this.http.get<any>(this.getAllData).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );}
    
    getAllSheet1Data(): Observable<any> {
        return this.http.get<any>(this.getData).pipe(
            tap(data => console.log('Thread: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );}

  
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //console.error(errorMessage);
    return throwError(errorMessage);
  }

}
