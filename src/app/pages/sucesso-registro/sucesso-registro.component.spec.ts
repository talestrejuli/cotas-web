import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoRegistroComponent } from './sucesso-registro.component';

describe('SucessoRegistroComponent', () => {
  let component: SucessoRegistroComponent;
  let fixture: ComponentFixture<SucessoRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessoRegistroComponent]
    });
    fixture = TestBed.createComponent(SucessoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
