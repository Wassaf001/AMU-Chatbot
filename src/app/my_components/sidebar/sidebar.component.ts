import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatDividerModule, MatListModule, MatCardModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  prompt: string | undefined;
  date: Date | undefined;
  constructor(private dataService: DataService) {}
  ngOnInit() {
  this.dataService.currentPrompt.subscribe(data => {
    this.prompt = data.prompt;
    this.date = data.date;
  });
 }
 changePrompt(newPrompt: string) {
  this.prompt = newPrompt;
}    
}
