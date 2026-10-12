import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'fb-project-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="content-wrap narrow-content">
      <a class="back-link" routerLink="/projects">← Back to projects</a>
      <div class="form-card">
        <div class="form-card-heading"><span class="form-icon">＋</span><div><p class="eyebrow">PROJECTS</p><h1>Create a project</h1><p>Set up a space for your team’s next piece of work.</p></div></div>
        @if (errorMessage()) { <div class="form-error" role="alert">{{ errorMessage() }}</div> }
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label for="project-name">Project name <span>*</span></label>
          <input id="project-name" type="text" formControlName="name" placeholder="e.g. Website redesign" maxlength="120" />
          @if (form.controls.name.touched && form.controls.name.invalid) { <small class="field-error">Enter a project name with at least 2 characters.</small> }
          <label for="project-description">Description</label>
          <textarea id="project-description" formControlName="description" rows="4" maxlength="500" placeholder="What does this project aim to accomplish?"></textarea>
          <div class="field-meta">{{ form.controls.description.value.length || 0 }}/500 characters</div>
          <div class="form-grid">
            <div><label for="project-status">Status</label><select id="project-status" formControlName="status"><option value="planning">Planning</option><option value="active">Active</option><option value="completed">Completed</option></select></div>
            <div><label for="project-due-date">Due date</label><input id="project-due-date" type="date" formControlName="dueDate" /></div>
          </div>
          <div class="form-actions"><a class="button button-ghost" routerLink="/projects">Cancel</a><button class="button button-primary" type="submit" [disabled]="form.invalid || saving()">{{ saving() ? 'Creating…' : 'Create project' }} <span>→</span></button></div>
        </form>
      </div>
    </div>
  `,
})
export class ProjectCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projects = inject(ProjectsService);
  private readonly router = inject(Router);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['planning' as 'planning' | 'active' | 'completed'],
    dueDate: [''],
  });

  submit(): void {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const value = this.form.getRawValue();
    this.projects.create({
      name: value.name.trim(),
      description: value.description.trim(),
      status: value.status,
      dueDate: value.dueDate || null,
    }).pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => void this.router.navigate(['/projects']),
      error: () => this.errorMessage.set('We could not create the project. Check that the API is running and try again.'),
    });
  }
}
