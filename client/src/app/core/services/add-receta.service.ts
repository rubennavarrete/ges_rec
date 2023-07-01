import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddRecetaService {

  URL_API = 'http://localhost:4000/recetas';

  constructor() { }
  
}
