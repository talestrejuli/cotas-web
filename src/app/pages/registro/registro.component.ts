import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

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

  @ViewChild(NgForm) form: NgForm;

  registroSucess() {
    this.router.navigate(['/login']);
  }

  isFieldInvalid(field: string): boolean {
    return this.form.controls[field].invalid && this.form.controls[field].dirty;
  }

  
  onSubmit() {
    if (this.form.valid) {
        const formData = this.getFormData();

        this.http.post('http://localhost:8080/usuarios', formData).subscribe(response => {
            console.log('Cadastro realizado com sucesso!', response);
            this.registroSucess();
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cadastro realizado com sucesso!'});
        }, error => {
            console.log(error); // Para diagnosticar a estrutura do erro

            const errorMessage = error.error.message || error.message || error.error;

            if (error.status === 400 && errorMessage === "E-mail já registrado.") {
                console.error(errorMessage);
                this.messageService.add({severity:'error', summary:'Erro', detail: "E-mail já registrado. Por favor, use outro e-mail."});
            } else {
                console.error('Erro ao realizar cadastro', error);
                this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao realizar cadastro. Por favor, tente novamente mais tarde.'});
            }
        });
    } else {
        // Se o formulário não for válido, verifica cada campo e exibe a mensagem toast correspondente
        Object.keys(this.form.controls).forEach(field => {
          const control = this.form.controls[field];
          control.markAllAsTouched();
        });
        if (this.form.controls.nome.invalid) {
            this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Nome é de preenchimento obrigatório.'});
        }
        if (this.form.controls.email.invalid) {
            this.messageService.add({severity:'error', summary:'Erro', detail:'O campo E-mail é de preenchimento obrigatório.'});
        }
        if (this.form.controls.dataNascimento.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Data de Nascimento é de preenchimento obrigatório.'});
          this.form.controls['nome'].markAsDirty();
        }
        if (this.form.controls.telefone.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Telefone é de preenchimento obrigatório.'});
        }
        if (this.form.controls.cep.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo CEP é de preenchimento obrigatório.'});
        }
        if (this.form.controls.logradouro.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Logradouro é de preenchimento obrigatório.'});
        }
        if (this.form.controls.bairro.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Bairro é de preenchimento obrigatório.'});
        }
        if (this.form.controls.cidade.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Cidade é de preenchimento obrigatório.'});
        }
        if (this.form.controls.uf.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo UF é de preenchimento obrigatório.'});
        }
        if (this.form.controls.numero.invalid) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo Número é de preenchimento obrigatório.'});
        }
    }
}


}