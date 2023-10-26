import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  validar() {
    this.usuarioService.validarUsuario(this.usuario).subscribe(
      res => {
        // Usuário validado com sucesso
        console.log('Validado com sucesso!');
      },
      error => {
        // Erro na validação
        console.error('Erro na validação:', error);
      }
    );
  }

  redirectToRegistro() {
    this.router.navigate(['/registro']);
  }
  
  ngOnInit(): void {
    // Verificar se existe algum parâmetro na URL indicando um erro de token
    this.route.queryParams.subscribe(params => {
      const tokenStatus = params['status'];
  
      if (tokenStatus === 'Token inválido') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Token inválido.'});
      } else if (tokenStatus === 'Token expirado') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Token expirado.'});
      }
    });
  }
  
}
