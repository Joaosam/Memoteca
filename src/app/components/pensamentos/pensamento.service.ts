import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento/pensamento.component';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  create(pensamento: Pensamento) {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  read(page: number, filter: string, favorito: boolean) {
    let params = new HttpParams().set('_page', page).set('_limit', 6);

    if (filter.trim().length > 1) {
      params = params.set('q', filter);
    }

    if (favorito) {
      params = params.set('favorito', true);
    }
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  update(pensamento: Pensamento) {
    return this.http.put<Pensamento>(
      `${this.API}/${pensamento.id}`,
      pensamento
    );
  }

  delete(id: number) {
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  readById(id: number) {
    return this.http.get<Pensamento>(`${this.API}/${id}`);
  }

  updateFavorites(pensamento: Pensamento) {
    pensamento.favorito = !pensamento.favorito;
    return this.update(pensamento);
  }
}
