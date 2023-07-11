import { Component } from '@angular/core';
import config from 'config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  baseUrl = config.URL_BASE_PATH;
  url = '/admin/' + this.baseUrl + 'login'
}
