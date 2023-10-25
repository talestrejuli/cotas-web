import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class BlockuiInterceptor implements HttpInterceptor {

  @BlockUI() blockUI: NgBlockUI;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.blockUI.start('Carregando...');

    return next.handle(request).pipe(
      finalize(() => {
        this.blockUI.stop();
      })
    );
  }
}
