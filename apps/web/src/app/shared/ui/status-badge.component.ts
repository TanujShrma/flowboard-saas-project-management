import { Component, input } from '@angular/core';

@Component({
  selector: 'fb-status-badge',
  standalone: true,
  template: `<span class="status-badge" [class]="'status-badge status-' + status()">{{ label() }}</span>`,
})
export class StatusBadgeComponent {
  readonly status = input('planning');
  readonly label = input('Planning');
}
