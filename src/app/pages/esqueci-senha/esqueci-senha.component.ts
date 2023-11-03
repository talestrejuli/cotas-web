import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent {

  constructor (private router: Router, private http: HttpClient, private messageService: MessageService ) {}

  retornarLogin() {
    this.router.navigate(['/login']);
  }

  email: string = '';

  getEmailData(): any {
    return {
      email: this.email,
  }}

  onSubmit(){
    const formData = this.getEmailData();

    this.http.post(`${environment.apiUrl}/usuarios/esqueci-senha`, formData).subscribe(response => {
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Email enviado com sucesso!'});
    }, error => {
      console.log(error); // Para diagnosticar a estrutura do erro

      const errorMessage = error?.error?.message || error?.message || error?.error;
      console.log("Erro completo: ", JSON.stringify(error, null, 2));

      if (error.status === 400 && errorMessage === "E-mail já registrado.") {
        console.error(errorMessage);
        this.messageService.add({severity:'error', summary:'Erro', detail: "E-mail já registrado. Por favor, use outro e-mail."});
      } else if (error.status === 500 && errorMessage.includes("Duplicate entry") && errorMessage.includes("for key 'usuarios.email'")) {
        console.error(errorMessage);
        this.messageService.add({severity:'error', summary:'Erro', detail: "E-mail já registrado. Por favor, use outro e-mail."});
      } else {
        console.error('Erro ao realizar cadastro', error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao realizar cadastro. Por favor, tente novamente mais tarde.'});
      } 
    })
  }

}
