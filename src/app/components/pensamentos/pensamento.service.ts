import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  read() {
    return this.http.get<Pensamento[]>(this.API);
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
}
