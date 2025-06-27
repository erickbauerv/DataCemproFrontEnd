import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Usuario = '';
  Senha = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    
    this.authService.login(this.Usuario, this.Senha).subscribe({
      next: (response) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.error = 'Usuário ou senha inválidos';
        console.error('Erro no login:', err);
      }
    });
  }
}
