import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/ui/page-header.component';

@Component({
  selector: 'fb-tasks-page',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <fb-page-header title="My tasks" subtitle="Keep your priorities clear and your next steps close." eyebrow="WORKSPACE / TASKS">
      <button class="button button-primary" type="button" (click)="showNotice()">＋ New task</button>
    </fb-page-header>
    <section class="surface-card task-placeholder">
      <div class="empty-illustration">☷</div><h2>Task management is the next milestone</h2>
      <p>The task feature is intentionally scaffolded as a separate lazy-loaded route. Extend it with a task model, typed service, reactive create/edit form, status transitions, due dates, and a Kanban view.</p>
      <div class="task-columns"><div><span class="column-dot dot-gray"></span><strong>To do</strong><span>Plan task creation</span></div><div><span class="column-dot dot-blue"></span><strong>In progress</strong><span>Connect API endpoints</span></div><div><span class="column-dot dot-green"></span><strong>Done</strong><span>Feature route created</span></div></div>
      @if (notice) { <p class="inline-notice" role="status">{{ notice }}</p> }
    </section>
  `,
})
export class TasksPageComponent {
  notice = '';
  showNotice(): void { this.notice = 'Task creation is a planned extension; see the README roadmap.'; }
}
