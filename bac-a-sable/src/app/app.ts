import { AsyncPipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal, computed } from '@angular/core';
import { form, Field } from '@angular/forms/signals';
import { interval, map } from 'rxjs';

interface UserData {
  name: string;
  age: string;
  id: string;
}

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, Field, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bac-a-sable');

  users: UserData[] = [
    { name: 'Bryan', age: '30', id: '1' },
    { name: 'Alice', age: '25', id: '2' },
    { name: 'Sophie', age: '28', id: '3' },
    { name: 'Mark', age: '35', id: '4' },
    { name: 'John', age: '40', id: '5' },
    { name: 'Emma', age: '22', id: '6' },
    { name: 'Olivia', age: '27', id: '7' },
    { name: 'Liam', age: '32', id: '8' },
    { name: 'Noah', age: '29', id: '9' },
    { name: 'Ava', age: '24', id: '10' },
    { name: 'Isabella', age: '26', id: '11' },
    { name: 'Sophia', age: '35', id: '12' },
    { name: 'Mia', age: '24', id: '13' },
    { name: 'Charlotte', age: '30', id: '14' },
    { name: 'Amelia', age: '28', id: '15' },
    { name: 'Harper', age: '33', id: '16' },
    { name: 'Evelyn', age: '28', id: '17' },
    { name: 'Abigail', age: '30', id: '18' },
    { name: 'Ella', age: '27', id: '19' },
    { name: 'Scarlett', age: '29', id: '20' },
  ];

  userModel = signal<UserData>(this.users[0]);

  userForm = form(this.userModel);

  counter = 0;

  colWidth = 6;

  id = signal(1);

  interval$ = interval(1000).pipe(
    map(() => this.counter++)
  );

  currentSelection = computed(() => {
    const id = this.userForm().value().id;
    return this.users.find(user => user.id === id);
  });

  sameAge = computed(() => {
    const id = this.userForm().value().id;
    const age = this.users.find(user => user.id === id)?.age;
    return this.users.filter(user => user.age === age && user.id !== this.userForm().value().id);
  });


  
  myCallHttp = httpResource(() =>    
    `https://jsonplaceholder.typicode.com/todos/${this.currentSelection()?.id || '1'}`,    
  );

}
