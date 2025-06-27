import { Component } from '@angular/core';
import { Produto } from '../../shared/Models/produto.model';
import { ProdutoService } from '../../services/produto/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  novoProduto: Produto = { id: 0, nome: '', valor: 0 };
  produtos: Produto[] = [];
  erro: string = '';


  constructor(
    public produtoService: ProdutoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.produtos = [];
      }
    });
  }

  adicionarProduto() {
    if (!this.novoProduto.nome || this.novoProduto.valor <= 0) {
      this.erro = 'Preencha todos os campos corretamente!';
      return;
    }

    this.produtoService.createProduto(this.novoProduto).subscribe({
      next: () => {
        this.novoProduto = { id: 0, nome: '', valor: 0 };
        this.erro = '';
        alert('Produto cadastrado!');
        this.carregarProdutos();
      },
      error: (err) => {
        this.erro = err.status === 401 
          ? 'Faça login novamente!' 
          : 'Erro ao cadastrar produto';
      }
    });
  }

  deletarProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          // Remove o produto da lista local
          this.produtos = this.produtos.filter(p => p.id !== id);
          this.erro = '';
        },
        error: (err) => {
          this.erro = err.status === 401 
            ? 'Faça login novamente!' 
            : 'Erro ao excluir produto';
          console.error('Erro ao excluir:', err);
        }
      });
    }
  }
}
