import { PensamentoService } from './../pensamento.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento.component';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  @Input() pensamentos: Pensamento[] = [];
  page = 1;
  haMaisPensamentos = true;
  filtro = '';
  favorito = false;
  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service
      .read(this.page, this.filtro, this.favorito)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .read(++this.page, this.filtro, this.favorito)
      .subscribe((pensamentos) => {
        this.pensamentos.push(...pensamentos);
        if (!pensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  filtrarPensamentos() {
    this.service
      .read(1, this.filtro, this.favorito)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }

  listarFavoritos() {
    this.favorito = true;
    this.service
      .read(this.page, this.filtro, this.favorito)
      .subscribe((pensamentosFavoritos) => {
        this.pensamentos = pensamentosFavoritos;
      });
  }

  listarMural() {
    this.favorito = false;
    this.service
      .read(1, this.filtro, this.favorito)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }
}
