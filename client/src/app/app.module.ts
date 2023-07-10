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
import { HomeComponent } from './pages/home/home.component';
import { LoginModule } from './pages/login/login.module';
import { FarmaciasComponent } from './pages/admin/farmacias/farmacias.component';
import { MedicosComponent } from './pages/admin/medicos/medicos.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminModule } from './pages/admin/admin.module';




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
