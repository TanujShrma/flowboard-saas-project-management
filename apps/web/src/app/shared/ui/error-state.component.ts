import { Component, input, output } from '@angular/core';

@Component({
  selector: 'fb-error-state',
  standalone: true,
  template: `<div class="state-panel error-panel" role="alert"><span class="state-icon">!</span><strong>{{ title() }}</strong><p>{{ message() }}</p><button class="button button-secondary" type="button" (click)="retry.emit()">Try again</button></div>`,
})
export class ErrorStateComponent {
  readonly title = input('Something went wrong');
  readonly message = input('We could not load this data. Please try again.');
  readonly retry = output<void>();
}
