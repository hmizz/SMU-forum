import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule} from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./navbar/navbar.component";
import { CardComponent } from './card/card.component';
import { BodyComponent } from './body/body.component';
import { CardsDeckComponent } from './cards-deck/cards-deck.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthInterceptor } from './authentication/auth-interceptor';
import {MatTabsModule} from '@angular/material/tabs';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    BodyComponent,
    CardsDeckComponent,
    FooterComponent,
    LoginComponent,
    PostsCreateComponent,
    PostListComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    CarouselModule,
    FormsModule,
    MatTabsModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
