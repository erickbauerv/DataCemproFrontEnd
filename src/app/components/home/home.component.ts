import { Component, OnInit  } from '@angular/core';
import { Produto } from '../../shared/Models/produto.model';
import { ProdutoService } from '../../services/produto/produto.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

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
}
