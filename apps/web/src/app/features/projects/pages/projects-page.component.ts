import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ErrorStateComponent } from '../../../shared/ui/error-state.component';
import { LoadingStateComponent } from '../../../shared/ui/loading-state.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header.component';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge.component';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'fb-projects-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent],
  template: `
    <fb-page-header title="Projects" subtitle="Plan, track, and deliver great work together." eyebrow="WORKSPACE / PROJECTS">
      <a class="button button-primary" routerLink="/projects/new"><span>＋</span> New project</a>
    </fb-page-header>
    <div class="metric-row compact-metrics">
      <div class="metric-card"><span class="metric-label">All projects</span><strong>{{ projects().length }}</strong><span class="metric-foot">In this workspace</span></div>
      <div class="metric-card"><span class="metric-label">Active</span><strong>{{ countByStatus('active') }}</strong><span class="metric-foot"><span class="tiny-dot green"></span> In progress</span></div>
      <div class="metric-card"><span class="metric-label">Planning</span><strong>{{ countByStatus('planning') }}</strong><span class="metric-foot">Getting started</span></div>
      <div class="metric-card"><span class="metric-label">Completed</span><strong>{{ countByStatus('completed') }}</strong><span class="metric-foot">Shipped work</span></div>
    </div>
    <section class="surface-card projects-surface">
      <div class="surface-heading"><div><h2>All projects</h2><p>A shared view of everything your team is working on.</p></div><div class="table-toolbar"><input aria-label="Search projects" class="search-input" placeholder="Search projects…" [value]="search()" (input)="search.set($any($event.target).value)" /><select aria-label="Filter by status" class="filter-select" [value]="statusFilter()" (change)="statusFilter.set($any($event.target).value)"><option value="all">All statuses</option><option value="active">Active</option><option value="planning">Planning</option><option value="completed">Completed</option><option value="archived">Archived</option></select></div></div>
      @if (loading()) { <fb-loading-state message="Loading projects…" /> }
      @else if (error()) { <fb-error-state title="Projects couldn't load" message="Check the API connection and try again." (retry)="loadProjects()" /> }
      @else if (filteredProjects().length === 0) {
        <div class="empty-state"><div class="empty-illustration">▦</div><h3>{{ projects().length ? 'No matching projects' : 'Your next big idea starts here' }}</h3><p>{{ projects().length ? 'Try changing your search or status filter.' : 'Create your first project to give your team a shared place to plan work.' }}</p>@if (!projects().length) { <a class="button button-primary" routerLink="/projects/new">Create your first project</a> }</div>
      } @else {
        <div class="table-scroll"><table class="data-table"><thead><tr><th>PROJECT</th><th>STATUS</th><th>DUE DATE</th><th>LAST UPDATED</th><th></th></tr></thead><tbody>
          @for (project of filteredProjects(); track project.id) {
            <tr><td><div class="project-cell"><span class="project-mark" [class]="'project-mark mark-' + project.status">{{ project.name.charAt(0).toUpperCase() }}</span><span><strong>{{ project.name }}</strong><small>{{ project.description || 'No description added' }}</small></span></div></td><td><fb-status-badge [status]="project.status" [label]="statusLabel(project.status)" /></td><td>{{ project.dueDate ? formatDate(project.dueDate) : '—' }}</td><td>{{ formatDate(project.updatedAt) }}</td><td><button class="row-more" type="button" [attr.aria-label]="'Delete ' + project.name" (click)="deleteProject(project)">···</button></td></tr>
          }
        </tbody></table></div>
        <div class="table-footer"><span>Showing {{ filteredProjects().length }} of {{ projects().length }} projects</span><span>Updated from your workspace</span></div>
      }
    </section>
  `,
})
export class ProjectsPageComponent {
  private readonly service = inject(ProjectsService);
  readonly projects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly search = signal('');
  readonly statusFilter = signal('all');
  readonly filteredProjects = () => {
    const query = this.search().trim().toLowerCase();
    return this.projects().filter((p) =>
      (this.statusFilter() === 'all' || p.status === this.statusFilter()) &&
      (!query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)),
    );
  };

  constructor() { this.loadProjects(); }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(false);
    this.service.getAll().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (items) => this.projects.set(items),
      error: () => this.error.set(true),
    });
  }

  countByStatus(status: string): number { return this.projects().filter((p) => p.status === status).length; }
  statusLabel(status: string): string { return status.charAt(0).toUpperCase() + status.slice(1); }
  formatDate(date: string): string {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? '—' : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  }

  deleteProject(project: Project): void {
    if (!globalThis.confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    this.service.delete(project.id).subscribe({
      next: () => this.projects.update((items) => items.filter((item) => item.id !== project.id)),
      error: () => this.error.set(true),
    });
  }
}
