import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormpipeComponent } from './components/formpipe/formpipe.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    NavbarComponent,
    FormpipeComponent,
    DetailpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
