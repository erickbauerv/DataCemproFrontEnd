import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5138/api/v1/autenticacao'; // Ajuste para sua API

  constructor(private http: HttpClient, private router: Router) {}

  login(Usuario: string, Senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { Usuario: Usuario, Senha: Senha });
  }
}
