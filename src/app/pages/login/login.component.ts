import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MensagemServico } from '../../services/mensagem/mensagemService';
import { LoginService } from 'src/app/services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();
  emailOrMatricula: string = '';
  password: string = '';
  

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private mensagemServico: MensagemServico,
    private loginService: LoginService
    ) { }

  redirectToRegistro() {
    this.router.navigate(['/registro']);
  }

  esqueciSenha() {
    this.router.navigate([`/esqueci-senha`]);
  }
  
  ngOnInit(): void {

    //Verifica a existência de mensagens
    setTimeout(() => {
      
      const mensagem = this.mensagemServico.getMensagem();
      if (mensagem) {
        this.messageService.add(mensagem);
      }

    // Verificar se existe algum parâmetro na URL indicando um erro de token
    this.route.queryParams.subscribe(params => {
      const tokenStatus = params['status'];
  
      if (tokenStatus === 'Token inválido') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Token inválido.'});
      } else if (tokenStatus === 'Token expirado') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Token expirado.'});
      }
    });
  });
  }


  validar() {
    // Verifica se o input é um e-mail
    if (this.isEmail(this.emailOrMatricula)) {
      // Chama o serviço de login por e-mail
      this.loginService.loginWithEmail(this.emailOrMatricula, this.password)
        .subscribe({
          next: (response) => {
            // Sucesso no login
            console.log('Login com e-mail realizado com sucesso!', response);
            this.router.navigate([`/pagina-inicial`]);
          },
          error: (error) => {
            // Erro durante o login
            console.error('Login com e-mail falhou!', error);
            // Verifica se o status do erro é 401 - Não autorizado
            if (error.status === 401) {
              // Verifica se a mensagem de erro é "Usuário não encontrado"
              if (error.error && error.error.message === "Usuário não encontrado") {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Falha no Login',
                  detail: 'Usuário não encontrado. Por favor, verifique suas credenciais.'
                });
              // Verifica se a mensagem de erro é "Senha inválida"
              } else if (error.error && error.error.message === "Senha inválida") {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Falha no Login',
                  detail: 'Senha inválida. Por favor, tente novamente.'
                });
              } else {
                // Outro tipo de erro de autenticação
                this.messageService.add({
                  severity: 'error',
                  summary: 'Falha no Login',
                  detail: 'Erro de autenticação. Por favor, verifique suas credenciais.'
                });
              }
            } else {
              // Outros erros não relacionados à autenticação
              this.messageService.add({
                severity: 'error',
                summary: 'Erro no Servidor',
                detail: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.'
              });
            }
          }
        });
    } else if (this.isNumeric(this.emailOrMatricula)) {
      // Chama o serviço de login por matrícula
      this.loginService.loginWithMatricula(this.emailOrMatricula, this.password)
        .subscribe({
          next: (response) => {
            // Sucesso no login com matrícula
            console.log('Login com matrícula realizado com sucesso', response);
          },
          error: (error) => {
            // Erro no login com matrícula
            console.error('Login com matrícula falhou!', error);
            // Tratamento de erro pode ser replicado aqui, conforme necessário
          }
        });
    } else {
      // Formato de entrada inválido
      this.messageService.add({
        severity:'error',
        summary:'Erro',
        detail:'Formato de e-mail / matrícula inválido.'
      });
    }
  }

  private isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  private isNumeric(input: string): boolean {
    const numericRegex = /^\d+$/;
    return numericRegex.test(input);
  }




}
