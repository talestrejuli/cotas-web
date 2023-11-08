import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginWithEmail(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      senha: password
    };
  
    return this.http.post(`${environment.apiUrl}/usuarios/login`, body);
  }
  
  loginWithMatricula(matricula: string, password: string): Observable<any> {
    const body = {
      matricula: matricula,
      senha: password
    };
  
    return this.http.post(`${environment.apiUrl}/usuarios/login-matricula`, body);
  }
  
}
