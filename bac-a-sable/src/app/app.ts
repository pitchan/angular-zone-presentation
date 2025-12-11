import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { interval, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bac-a-sable');

  counter = 0;

  colWidth = 6;

  user = {
    name: 'Bryan',
    email: 'bryan@example.com'
  };

  interval$ = interval(1000).pipe(
    map(() => this.counter++)
  );

}
