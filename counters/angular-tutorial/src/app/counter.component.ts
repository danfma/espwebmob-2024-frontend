import {Component} from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button type="button" (click)="decrement()"> - </button>
    <span>{{ count }}</span>
    <button type="button" (click)="increment()"> + </button>
  `
})
export class CounterComponent {
  count = 0;

  decrement() {
    this.count--;
  }

  increment() {
    this.count++;
  }
}
