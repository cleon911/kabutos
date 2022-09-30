import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigosService {

  /// baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";
  baseUrl :string= "http://127.0.0.1:8000/movil/";
  
  constructor(
    private http: HttpClient) { }
    
    getCodigos(codigoStr):Observable<any> {
      const headers = {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
      const body = JSON.stringify(codigoStr);
      return this.http.post(this.baseUrl+'codigos/',body,{'headers':headers})            
    }
}
