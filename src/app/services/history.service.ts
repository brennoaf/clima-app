import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: any[] = [];
  private lastEntry: any = null;

  getHistory(): any[] {
    return this.history;
  }

  addHistory(entry: any): void {
    this.history.push(entry);
    this.lastEntry = entry;
  }

  getLastEntry(): any {
    return this.lastEntry;
  }
}
