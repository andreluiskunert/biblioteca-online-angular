export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  ano?: number;
  categoria?: string;
  capaUrl?: string;
  criadoEmISO: string; // para ordenar e mostrar "recentes"
}
