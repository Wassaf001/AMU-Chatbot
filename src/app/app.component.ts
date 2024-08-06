import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsComponent } from './my_components/chats/chats.component';
import { PromptComponent } from './my_components/prompt/prompt.component';
import { SidebarComponent } from './my_components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatsComponent, RouterOutlet, PromptComponent, SidebarComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AMU-Chatbot';
}
