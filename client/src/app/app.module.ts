import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './core/services/login.service';


//MODULES
import { HttpClient, HttpClientModule } from '@angular/common/http';


//LAYOUT
import { LayoutModule } from "./layout/layout.module";
import { UpdateUserComponent } from './components/usuarios/modals/update-user/update-user.component';




@NgModule({
    declarations: [
        AppComponent,
    
    ],
    providers: [
        LoginService,

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        
    ]
})
export class AppModule { }
