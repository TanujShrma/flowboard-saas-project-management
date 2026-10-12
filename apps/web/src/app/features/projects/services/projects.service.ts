import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectRequest, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/projects';

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.endpoint);
  }

  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.endpoint}/${id}`);
  }

  create(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.endpoint, request);
  }

  update(id: string, request: Partial<CreateProjectRequest>): Observable<Project> {
    return this.http.patch<Project>(`${this.endpoint}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
