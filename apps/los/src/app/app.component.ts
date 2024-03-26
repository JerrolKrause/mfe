import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MasterpageModule} from '$libs'

@Component({
  standalone: true,
  imports: [RouterModule, MasterpageModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'los';
}
