import { Component } from '@angular/core';

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

}
