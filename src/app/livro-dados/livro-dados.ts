import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { ControleLivros } from '../controle-livros';

@Component({
  selector: 'app-livro-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './livro-dados.html',
  styleUrls: ['./livro-dados.css']
})
export class LivroDadosComponent {
  titulo = '';
  autor = '';
  ano?: number;
  categoria = '';

  readonly erro = signal<string | null>(null);

  constructor(private ctrl: ControleLivros, private router: Router) {}

  salvar() {
    this.erro.set(null);

    const titulo = this.titulo.trim();
    const autor = this.autor.trim();
    const categoria = this.categoria.trim();

    if (!titulo) return this.erro.set('Informe o título do livro.');
    if (!autor) return this.erro.set('Informe o autor do livro.');

    const anoNum = this.ano ? Number(this.ano) : undefined;
    if (anoNum && (anoNum < 0 || anoNum > new Date().getFullYear() + 1)) {
      return this.erro.set('Informe um ano válido.');
    }

    this.ctrl.adicionar({
      titulo,
      autor,
      ano: anoNum,
      categoria,
      capaUrl: ''
    });

    this.router.navigateByUrl('/');
  }
}
