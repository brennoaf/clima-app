import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageCardComponent } from './components/home/page-card/page-card.component';
import { HistoryComponent } from './pages/history/history.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', component: HomePageCardComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'details', component: DetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
