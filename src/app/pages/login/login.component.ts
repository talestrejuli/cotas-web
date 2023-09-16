import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

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
  
}
