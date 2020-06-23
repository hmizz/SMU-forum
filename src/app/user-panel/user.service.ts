import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { UserInfo } from "./userInfo.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private user: UserInfo;
  private userUpdated = new Subject<UserInfo>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getUserInfo() {
    this.http
      .get<{ message: string, userDetails: UserInfo }>(
        "http://localhost:3000/api/user/" + this.authService.getUserID())
      .subscribe((userDetails) => {
        this.user = userDetails.userDetails;
        this.userUpdated.next(this.user);
      });
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
  getUser() {
    return this.user;
  }

  updateUser(
    id: string,
    firstName: string,
    lastName: string,
    gender: string,
    doBirth: string,
    level: string,
    institute: string,
    description: string,
    user: string
  ) {
    let userInfo: UserInfo = {
      _id : id ,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      doBirth: doBirth,
      level: level,
      institute: institute,
      description: description,
      user: user,
    };
    this.http
      .post<{ message: string }>(
        "http://localhost:3000/api/user/" + this.authService.getUserID(),
        userInfo
      )
      .subscribe(() => {
        this.user = userInfo;
        this.router.navigate(["/"]);
      });
  }
}
