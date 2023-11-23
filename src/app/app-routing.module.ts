import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {IconsComponent} from './utilities/icons.component';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SucessoRegistroComponent } from './pages/sucesso-registro/sucesso-registro.component';
import { ConfirmarEmailComponent } from './pages/confirmar-email/confirmar-email.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { PaginaInicialComponent } from './pages/usuario-externo/pagina-inicial/pagina-inicial.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
            {path: 'registro', component: RegistroComponent},
            {path: 'sucesso-registro', component: SucessoRegistroComponent},
            {path: 'confirmar-email', component: ConfirmarEmailComponent},
            {path: 'esqueci-senha', component: EsqueciSenhaComponent},
            {path: 'redefinir-senha', component: RedefinirSenhaComponent},
            {path: 'app-main', component: AppMainComponent},
            {path: 'pagina-inicial', component: PaginaInicialComponent}
        ], {scrollPositionRestoration: 'enabled'}), 
        
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
