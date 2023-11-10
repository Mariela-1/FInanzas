import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,

  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFinanzas';
}
