import { Component } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatDividerModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  myControl = new FormControl('');
}
