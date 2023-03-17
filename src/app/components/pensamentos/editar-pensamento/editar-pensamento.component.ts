import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { minusculoValidator } from '../criar-pensamento/minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.readById(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        mensagem: [
          pensamento.mensagem,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/), // não aceita espaços em branco
          ]),
        ],
        autor: [
          pensamento.autor,
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            minusculoValidator,
          ]),
        ],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito],
      });
    });
  }

  editarPensamento() {
    this.service.update(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
