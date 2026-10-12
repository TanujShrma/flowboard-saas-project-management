import { Component, input } from '@angular/core';

@Component({
  selector: 'fb-page-header',
  standalone: true,
  template: `
    <div class="page-header">
      <div><p class="eyebrow">{{ eyebrow() }}</p><h1>{{ title() }}</h1><p class="page-subtitle">{{ subtitle() }}</p></div>
      <div class="page-header-actions"><ng-content /></div>
    </div>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly eyebrow = input('WORKSPACE');
}
