import { Input, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent {
  readonly panelOpenState = signal(false);
  chats: string[] = [];
  prompts: string[] = [];
  @Input() prompt: string = '';
  constructor(private dataService: DataService) {}
  ngOnInit() {
  this.dataService.currentPrompt.subscribe(data => {
    this.prompt = data.prompt;
    this.prompts.push(data.prompt);
    this.chats = data.chats;
  });
}
}
