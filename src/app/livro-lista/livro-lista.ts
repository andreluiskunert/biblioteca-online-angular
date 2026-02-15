import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ControleLivros } from '../controle-livros';
import { Livro } from '../livro';

type ModoVisao = 'lista' | 'catalogo';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livro-lista.html',
  styleUrls: ['./livro-lista.css']
})
export class LivroListaComponent {
  readonly busca = signal('');
  readonly modo = signal<ModoVisao>('lista');

  readonly livrosFiltrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    const livros = this.ctrl.livros();
    if (!termo) return livros;

    return livros.filter(l =>
      (l.titulo ?? '').toLowerCase().includes(termo) ||
      (l.autor ?? '').toLowerCase().includes(termo) ||
      (l.categoria ?? '').toLowerCase().includes(termo) ||
      String(l.ano ?? '').includes(termo)
    );
  });

  constructor(public ctrl: ControleLivros) {}

  setModo(m: ModoVisao) { this.modo.set(m); }

  trackById(_: number, item: Livro) { return item.id; }

  remover(livro: Livro) {
    const ok = confirm(`Excluir o livro: "${livro.titulo}"?`);
    if (ok) this.ctrl.remover(livro.id);
  }

  limparTudo() {
    const ok = confirm('Tem certeza que deseja apagar TODOS os livros?');
    if (ok) this.ctrl.limparTudo();
  }
}
