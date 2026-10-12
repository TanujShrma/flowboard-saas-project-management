import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/projects-page.component').then((m) => m.ProjectsPageComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/project-create-page.component').then((m) => m.ProjectCreatePageComponent),
  },
];
