import { Injectable, signal, computed } from '@angular/core';
import { Livro } from './livro';

type LivroNovo = Omit<Livro, 'id' | 'criadoEmISO'>;

@Injectable({ providedIn: 'root' })
export class ControleLivros {
  private readonly storageKey = 'biblioteca_online_livros_v1';

  private readonly _livros = signal<Livro[]>(this.carregar());
  readonly livros = computed(() => this._livros());

  private carregar(): Livro[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return this.livrosExemplo();
      const parsed = JSON.parse(raw) as Livro[];
      if (!Array.isArray(parsed)) return this.livrosExemplo();
      return parsed;
    } catch {
      return this.livrosExemplo();
    }
  }

  private salvar(livros: Livro[]) {
    this._livros.set(livros);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(livros));
    } catch {
      // se o navegador bloquear storage, ainda funciona em memória
    }
  }

  private livrosExemplo(): Livro[] {
    const now = new Date().toISOString();
    return [
      {
        id: crypto?.randomUUID?.() ?? '1',
        titulo: 'Angular para Iniciantes',
        autor: 'Autor(a) Exemplo',
        ano: 2024,
        categoria: 'Programação',
        capaUrl: '',
        criadoEmISO: now
      },
      {
        id: crypto?.randomUUID?.() ?? '2',
        titulo: 'Node.js Profissional',
        autor: 'Autor(a) Exemplo',
        ano: 2023,
        categoria: 'Back-end',
        capaUrl: '',
        criadoEmISO: now
      }
    ];
  }

  adicionar(novo: LivroNovo) {
    const livro: Livro = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      criadoEmISO: new Date().toISOString(),
      ...novo
    };
    const atual = this._livros();
    this.salvar([livro, ...atual]);
  }

  remover(id: string) {
    const atual = this._livros();
    this.salvar(atual.filter(l => l.id !== id));
  }

  limparTudo() {
    this.salvar([]);
  }
}
