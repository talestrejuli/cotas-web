import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent {

  constructor (private router: Router, private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) {}

  senha: string = '';
  confirmarSenha: string = '';
  token: string;

  @ViewChild(NgForm) form: NgForm;

  retornarLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  getSenhaData(): any {
    return {
      senha: this.senha,
    };
  }

  onSubmit() {
    if(this.form.valid){
      if(this.senha === this.confirmarSenha) {
        const formData = this.getSenhaData();
        
        this.http.post(`${environment.apiUrl}/usuarios/validar-esqueci-senha`, formData).subscribe(response => {
          this.retornarLogin();  
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Senha redefinida com sucesso!'});
        }, error => {

          const errorMessage = error?.error?.message || error?.message || error?.error;
          console.log("Erro completo: ", JSON.stringify(error, null, 2));

        });

      } else {
        this.messageService.add({severity:'error', summary:'Erro', detail:'As senhas devem ser iguais'})
      }

    }
  }



}
