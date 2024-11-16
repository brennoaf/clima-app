import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './pages/details/details.component';
import { HistoryComponent } from './pages/history/history.component';
import { PageCardComponent } from './components/home/page-card/page-card.component';
import { MainCardComponent } from './components/main-card/main-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HistoryComponent,
    PageCardComponent,
    MainCardComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
