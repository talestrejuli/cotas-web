import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-sucesso-registro',
  templateUrl: './sucesso-registro.component.html',
  styleUrls: ['./sucesso-registro.component.scss']
})
export class SucessoRegistroComponent implements OnInit {
  counter$: Observable<number>;
  isButtonDisabled = true;

  visible: boolean = false;
  email: string;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

      this.counter$ = timer(0, 1000).pipe(
        map(tick => 60 - tick),
        takeWhile(tick => tick >= 0)
      );
      
      this.counter$.subscribe(tick => {
        if (tick === 0) {
          this.isButtonDisabled = false;
        }
      });
    
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email reenviado com sucesso!' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao reenviar e-mail.' });
}
  

  showDialog() {
    this.visible = true;
  }

  retornarLogin() {
    this.router.navigate(['/login']);
  }

  reenviarEmail() {
    const url = `${environment.apiUrl}/usuarios/reenviar-email`;
    this.http.post(url, this.email, {headers: {'Content-Type': 'text/plain'}, responseType: 'text'})
      .subscribe(
        response => {
          console.log('Resposta bem-sucedida:', response);
          this.showSuccess();
        },
        error => {
          console.log('Erro:', error);
          this.showError;
          if (error.status === 400){
          }
        }
      );
  }





}
