import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  tokenData: any;

  constructor(private cookieService: CookieService, private router: Router) { 

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean{
    const token = this.cookieService.get('token'); // Reemplaza 'nombre_de_la_cookie' con el nombre real de tu cookie
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.tokenData = tokenPayload;
    } else {
      console.log('Token no encontrado en las cookies.');
      this.router.navigate(['/login']);
      return false;
    }

    console.log('Valores del token:', this.tokenData);
    console.log('Valores del Data:', route.data['role']);

    if(this.tokenData.rol === route.data['role']){
      return true;
    }else  
    {
      this.router.navigate(['error404']);
      return false;
    }

    

    
  }
  
}
