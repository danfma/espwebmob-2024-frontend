import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CounterComponent} from './counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-tutorial';

  items = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];
}
