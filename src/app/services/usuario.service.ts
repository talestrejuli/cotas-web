import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Atualize com o caminho correto do seu modelo de usuário

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL = 'http://localhost:8080/api/usuarios'; // Ajuste conforme sua URL base

  constructor(private httpClient: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseURL}/cadastro`, usuario);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseURL}/usuario`, usuario);
  }

  validarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/validar`, usuario);
  }
}
