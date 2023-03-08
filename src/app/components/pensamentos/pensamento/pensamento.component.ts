import { PensamentoService } from './../pensamento.service';
import { Component, Input, OnInit } from '@angular/core';

export interface Pensamento {
  id: number;
  mensagem: string;
  autor: string;
  modelo: string;
}

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    mensagem: '',
    autor: '',
    modelo: '',
  };

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento() {
    if (this.pensamento.mensagem.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }
}
