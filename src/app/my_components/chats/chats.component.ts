import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent {
  readonly panelOpenState = signal(false);
}
