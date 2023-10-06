import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucesso-registro',
  templateUrl: './sucesso-registro.component.html',
  styleUrls: ['./sucesso-registro.component.scss']
})
export class SucessoRegistroComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  constructor(private router: Router) {}

  retornarLogin() {
    this.router.navigate(['/login']);
  }
}