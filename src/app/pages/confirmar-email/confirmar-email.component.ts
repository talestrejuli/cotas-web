import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.scss']
})
export class ConfirmarEmailComponent implements OnInit {

  token: string | null = null;
  message: string = '';

  constructor(private router: Router) { }

  retornarLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    
  }

}
