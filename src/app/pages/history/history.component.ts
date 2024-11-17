import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: any;

  constructor(private historyService: HistoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.history = this.historyService.getHistory();
    console.log(this.history)
    for(let entry of this.history){
      console.log(entry)
    }
  }

  backToHome(): void {
    this.router.navigate([''])
  }
}
