import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BlockUIModule} from 'ng-block-ui';
import {BlockuiInterceptor} from '../interceptor/blockui.interceptor';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        BlockUIModule
    ],
    declarations: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: BlockuiInterceptor, multi: true
        }
    ],
    exports: [],
})
export class CoreModule {
}