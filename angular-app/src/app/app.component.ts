import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponentComponent, } from './test-component/test-component.component';
import { UserSearchComponent } from './user-search/user-search.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestComponentComponent, UserSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
