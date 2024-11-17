import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  weatherData: any;

  constructor(private historyService: HistoryService, private router: Router) {}

  ngOnInit(): void {
    this.weatherData = this.historyService.getLastEntry(); // Recupera a última entrada
  }

  backToHome(): void{
    this.router.navigate([''])
  }
}
