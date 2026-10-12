import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ProjectsService } from './projects.service';
import { apiInterceptor } from '../../../core/interceptors/api.interceptor';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProjectsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the project collection from the configured API', () => {
    service.getAll().subscribe((projects) => expect(projects).toEqual([]));
    const request = http.expectOne('http://localhost:3000/api/projects');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
