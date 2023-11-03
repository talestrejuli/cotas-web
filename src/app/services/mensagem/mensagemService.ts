import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensagemServico {
  private mensagem: any = null;

  setMensagem(mensagem: any) {
    this.mensagem = mensagem;
  }

  getMensagem() {
    const mensagem = this.mensagem;
    this.mensagem = null;  // Limpa a mensagem após ser obtida
    return mensagem;
  }
}