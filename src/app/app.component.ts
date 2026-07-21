import {Component} from '@angular/core';
import {demo} from "./demo/for-demo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly demo = demo;
}
