import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './pages/details/details.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomePageCardComponent } from './components/home/page-card/page-card.component';
import { MainCardComponent } from './components/main-card/main-card.component';

import { TemperatureFormatPipe } from './components/pipes/temp-format.pipe';

import { TemperatureToggleDirective } from './components/directives/temp-toggle.directive';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HistoryComponent,
    HomePageCardComponent,
    MainCardComponent,

    TemperatureFormatPipe,

    TemperatureToggleDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
