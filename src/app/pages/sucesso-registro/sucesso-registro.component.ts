import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) {}

  retornarLogin() {
    this.router.navigate(['/login']);
  }

}