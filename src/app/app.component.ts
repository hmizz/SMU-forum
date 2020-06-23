import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMU-FORUM';

  constructor(private authService : AuthService) {

    }
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
