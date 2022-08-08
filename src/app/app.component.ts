import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAuthenticated :boolean=false;
  title = 'material';
  constructor(public authService: AuthService) { }

  logout() :void {
    this.authService.doLogout();
  }
}
