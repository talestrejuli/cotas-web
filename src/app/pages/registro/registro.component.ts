import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface Cidade {
  nome: string;
  code: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) {}

  cancelRegistro() {
    this.router.navigate(['/login']);
  }

  cidades: Cidade[] = [
    { nome: 'AC', code: 'Acre'},
    { nome: 'AL', code: 'Alagoas'},
    { nome: 'AM', code: 'Amazonas'},
    { nome: 'AP', code: 'Amapá'},
    { nome: 'BA', code: 'Bahia'},
    { nome: 'CE', code: 'Ceará'},
    { nome: 'DF', code: 'Distrito Federal'},
    { nome: 'ES', code: 'Espírito Santo'},
    { nome: 'GO', code: 'Goiás'},
    { nome: 'MA', code: 'Maranhão'},
    { nome: 'MG', code: 'Minas Gerais'},
    { nome: 'MS', code: 'Mato Grosso do Sul'},
    { nome: 'MT', code: 'Mato Grosso'},
    { nome: 'PA', code: 'Pará'},
    { nome: 'PB', code: 'Paraíba'},
    { nome: 'PE', code: 'Pernambuco'},
    { nome: 'PI', code: 'Piauí'},
    { nome: 'PR', code: 'Paraná'},
    { nome: 'RJ', code: 'Rio de Janeiro'},
    { nome: 'RN', code: 'Rio Grande do Norte'},
    { nome: 'RO', code: 'Rondônia'},
    { nome: 'RR', code: 'Roraima'},
    { nome: 'RS', code: 'Rio Grande do Sul'},
    { nome: 'SC', code: 'Santa Catarina'},
    { nome: 'SE', code: 'Sergipe'},
    { nome: 'SP', code: 'São Paulo'},
    { nome: 'TO', code: 'Tocantins'},
  ];

  cidadeSelecionada: Cidade | undefined;

  ngOnInit(): void {
    console.log(this.form);
  }

  nome: string = '';
  email: string = '';
  dataNascimento: String = '';
  telefone: string = '';
  aceitaAviso: string = '';
  endereco = {
    logradouro: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: ''
  }

  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  getFormData(): any {
    return {
      nome: this.nome,
      email: this.email,
      dataNascimento: this.dataNascimento,
      telefone: this.removeMask(this.telefone),  // Removendo máscara do telefone
      aceitaAviso: this.aceitaAviso,
      endereco: {
        ...this.endereco,
        cep: this.removeMask(this.endereco.cep)  // Removendo máscara do CEP
      }
    };
  }

  onSubmit() {
    const formData = this.getFormData();

    this.http.post('http://localhost:8080/usuarios', formData).subscribe(response => {
        console.log('Cadastro realizado com sucesso!', response);
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cadastro realizado com sucesso!'});
    }, error => {
        if (error.status === 400 && Array.isArray(error.error)) {
            // Mostrando as mensagens de erro retornadas pelo backend
            error.error.forEach(errMsg => {
                console.error(errMsg);
                this.messageService.add({severity:'error', summary:'Erro', detail: errMsg});
            });
        } else {
            console.error('Erro ao realizar cadastro', error);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao realizar cadastro. Por favor, tente novamente mais tarde.'});
        }
    });
}

@ViewChild(NgForm) form: NgForm;

onBlur(fieldName: string) {
  console.log('onBlur function called for', fieldName);
  const control = this.form.form.get(fieldName);
  if (control) {
      control.markAsTouched();
      control.markAsDirty();
  }
}


}