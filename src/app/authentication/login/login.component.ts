import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }
    message = true ;
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.message = this.authService.message;
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.fullname, form.value.email, form.value.password);
  }
  ngOnInit(): void {
  }

}
