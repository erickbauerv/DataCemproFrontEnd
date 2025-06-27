import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5138/api/v1/autenticacao';

  constructor(private http: HttpClient, private router: Router) {}

  login(Usuario: string, Senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { Usuario: Usuario, Senha: Senha });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return 'User';
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.roles || 'User';
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return 'User';
    }
  }

  isAdminUser(): boolean {
    return this.getUserRole() == 'Admin';
  }
}
