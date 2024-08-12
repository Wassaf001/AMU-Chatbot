import { Component , Output, EventEmitter} from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatIconModule, MatDividerModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  myControl = new FormControl('');
  constructor(private dataService: DataService) {}
  @Output() inputValueChange = new EventEmitter<string>();
  onSubmit() {
    if (this.myControl.value !== null && this.myControl.value.trim() !== '') {
      const date = new Date();
      const chats = ['Hi']; 
      this.dataService.changePrompt(this.myControl.value, date, chats);
      this.inputValueChange.emit(this.myControl.value);
      this.myControl.reset(); 
    }
  }
}
