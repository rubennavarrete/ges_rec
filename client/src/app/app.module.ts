import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './core/services/login.service';


//MODULES
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


//LAYOUT
import { LayoutModule } from "./layout/layout.module";
import { LoginModule } from './pages/login/login.module';
import { AdminModule } from './pages/admin/admin.module';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor';
import { ChangePasswordComponent } from './components/change-password/change-password.component';





@NgModule({
    declarations: [
        AppComponent,
        // HomeComponent,
        // FarmaciasComponent,
        // MedicosComponent,
        // AdminModule,
    
    ],
    providers: [
        LoginService,
        CookieService,
        [
            { provide:HTTP_INTERCEPTORS,
                useClass: InjectSessionInterceptor,
                multi: true,
            }
        ]

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        LoginModule,
        AdminModule
        
    ]
})
export class AppModule { }
