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
  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.read().subscribe((pensamentos) => {
      this.pensamentos = pensamentos;
    });
  }
}
