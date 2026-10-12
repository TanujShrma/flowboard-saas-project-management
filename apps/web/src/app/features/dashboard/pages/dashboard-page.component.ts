import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/ui/page-header.component';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge.component';

@Component({
  selector: 'fb-dashboard-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <fb-page-header title="Good morning, Tanuj" subtitle="Here’s what’s happening across your workspace." eyebrow="MONDAY, OCTOBER 12">
      <button class="button button-secondary" type="button" (click)="exportSummary()">↓ Export</button>
      <a class="button button-primary" routerLink="/projects/new"><span>＋</span> New project</a>
    </fb-page-header>
    <div class="welcome-banner"><div class="welcome-copy"><span class="welcome-kicker">YOUR WORKSPACE, IN SYNC</span><h2>Make progress visible.</h2><p>Bring your team’s plans, priorities, and projects together in one calm place.</p><a routerLink="/projects" class="banner-link">Explore your projects <span>→</span></a></div><div class="banner-art" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-board"><div class="art-board-top"><span></span><span></span><span></span></div><div class="art-board-line line-a"></div><div class="art-board-line line-b"></div><div class="art-board-line line-c"></div><div class="art-board-chip"></div></div><div class="art-floating float-one">✓</div><div class="art-floating float-two">↗</div></div></div>
    <div class="section-heading"><div><h2>Workspace overview</h2><p>A quick look at your team’s momentum.</p></div><span class="date-pill">Last 30 days <span>⌄</span></span></div>
    <div class="metric-row">
      <div class="metric-card"><div class="metric-top"><span class="metric-label">Total projects</span><span class="metric-icon icon-violet">▦</span></div><div class="metric-value">12 <span class="metric-trend trend-up">↗ 16.8%</span></div><span class="metric-foot">Compared with last month</span><div class="mini-bars bars-purple"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="metric-card"><div class="metric-top"><span class="metric-label">Tasks completed</span><span class="metric-icon icon-green">✓</span></div><div class="metric-value">84 <span class="metric-trend trend-up">↗ 12.4%</span></div><span class="metric-foot">Compared with last month</span><div class="mini-bars bars-green"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="metric-card"><div class="metric-top"><span class="metric-label">In progress</span><span class="metric-icon icon-blue">◷</span></div><div class="metric-value">23 <span class="metric-trend trend-neutral">Across 5 projects</span></div><span class="metric-foot">Tasks currently being worked on</span><div class="progress-track"><span style="width:68%"></span></div></div>
      <div class="metric-card"><div class="metric-top"><span class="metric-label">Upcoming deadlines</span><span class="metric-icon icon-orange">♧</span></div><div class="metric-value">6 <span class="metric-trend trend-warn">Next 7 days</span></div><span class="metric-foot">Keep an eye on these milestones</span><div class="deadline-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
    </div>
    <div class="dashboard-grid">
      <section class="surface-card"><div class="surface-heading"><div><h2>Recent projects</h2><p>Jump back into where the team left off.</p></div><a class="text-link" routerLink="/projects">View all <span>→</span></a></div>
        <div class="recent-project"><span class="project-mark mark-active">W</span><div class="recent-copy"><strong>Website redesign</strong><small>Design · Development</small><div class="progress-track"><span style="width:72%"></span></div></div><div class="recent-meta"><strong>72%</strong><fb-status-badge status="active" label="Active" /></div></div>
        <div class="recent-project"><span class="project-mark mark-planning">M</span><div class="recent-copy"><strong>Mobile app launch</strong><small>Product · Marketing</small><div class="progress-track"><span class="progress-lilac" style="width:38%"></span></div></div><div class="recent-meta"><strong>38%</strong><fb-status-badge status="planning" label="Planning" /></div></div>
        <div class="recent-project"><span class="project-mark mark-completed">B</span><div class="recent-copy"><strong>Brand refresh</strong><small>Brand · Creative</small><div class="progress-track"><span class="progress-green" style="width:100%"></span></div></div><div class="recent-meta"><strong>100%</strong><fb-status-badge status="completed" label="Completed" /></div></div>
      </section>
      <section class="surface-card activity-card"><div class="surface-heading"><div><h2>Activity</h2><p>Latest updates from your team.</p></div><button class="quiet-button" type="button">···</button></div>
        <div class="activity-item"><div class="activity-avatar avatar-peach">AK</div><div><p><strong>Amelia Kim</strong> completed <b>Homepage wireframes</b></p><small>Website redesign · 12 min ago</small></div></div>
        <div class="activity-item"><div class="activity-avatar avatar-blue">JR</div><div><p><strong>Jordan Reed</strong> added a comment to <b>API integration</b></p><small>Mobile app launch · 48 min ago</small></div></div>
        <div class="activity-item"><div class="activity-avatar avatar-lilac">TS</div><div><p><strong>You</strong> created <b>Launch checklist</b></p><small>Mobile app launch · 2 hours ago</small></div></div>
        <div class="activity-item"><div class="activity-avatar avatar-green">MC</div><div><p><strong>Mia Chen</strong> moved <b>Design review</b> to completed</p><small>Brand refresh · Yesterday</small></div></div>
        <a class="activity-link" routerLink="/tasks">Go to my tasks <span>→</span></a>
      </section>
    </div>
    <div class="demo-note"><span>i</span><p><strong>Portfolio preview:</strong> Dashboard analytics and activity are sample presentation data. The Projects page is connected to the NestJS API.</p></div>
  `,
})
export class DashboardPageComponent {
  exportSummary(): void {
    const content = 'Flowboard workspace summary\nTotal projects: 12\nTasks completed: 84\nIn progress: 23\nUpcoming deadlines: 6\n\nNote: sample dashboard metrics.';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'flowboard-summary.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
