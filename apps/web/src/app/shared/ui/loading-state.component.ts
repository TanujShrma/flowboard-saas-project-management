import { Component, input } from '@angular/core';

@Component({
  selector: 'fb-loading-state',
  standalone: true,
  template: `<div class="state-panel" role="status"><span class="spinner"></span><strong>{{ message() }}</strong></div>`,
})
export class LoadingStateComponent {
  readonly message = input('Loading your workspace…');
}
