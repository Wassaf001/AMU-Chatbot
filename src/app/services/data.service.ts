import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn : 'root'
})
export class DataService {
  private promptSource = new BehaviorSubject<{prompt: string, date: Date, chats: string[]}>({prompt: '', date: new Date(), chats: ['Hi']});
  currentPrompt = this.promptSource.asObservable();

  changePrompt(prompt: string, date: Date, chats: string[]) {
    this.promptSource.next({prompt, date, chats});
  }
}