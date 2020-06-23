import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.username= this.authService.getUsername();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.username = this.authService.getUsername();
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
