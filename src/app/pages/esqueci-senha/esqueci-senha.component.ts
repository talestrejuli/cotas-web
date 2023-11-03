import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent {

  constructor (private router: Router, private http: HttpClient, private messageService: MessageService ) {}

  @ViewChild(NgForm) form: NgForm;
  
  retornarLogin() {
    this.router.navigate(['/login']);
  }

  email: string = '';

  getEmailData(): any {
    return {
      email: this.email,
  }}

  isFieldInvalid(field: string): boolean {
    return this.form.controls[field].invalid && this.form.controls[field].dirty;
  }

  esqueciSenha() {
    if(this.form.valid) {

      const formData = this.getEmailData();

      this.http.post(`${environment.apiUrl}/usuarios/esqueci-senha`, formData).subscribe(response => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'E-mail enviado com sucesso!'});
        }, error => {
            const errorMessage = error?.error?.error || error?.message || error?.error;

            if (error.status === 404 && error.error?.error === "E-mail não cadastrado") {
              console.error(errorMessage);
              this.messageService.add({severity:'error', summary:'Erro', detail: "E-mail não registrado em nossa base de dados"});
            }
        });
    } else {
      //Caso o formulário não seja válido
      if (this.form.controls.email.invalid) {
        if (this.form.controls.email.errors.required) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O campo E-mail é de preenchimento obrigatório.'});
        } else if (this.form.controls.email.errors.email) {
          this.messageService.add({severity:'error', summary:'Erro', detail:'O formato do E-mail é inválido.'});
        }
      }
    }

  }
  


}
