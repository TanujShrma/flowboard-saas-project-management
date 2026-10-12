import { NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectStatus } from './entities/project.entity';

describe('ProjectsService', () => {
  const repository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
  let service: ProjectsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProjectsService(repository as never);
  });

  it('lists projects ordered by update time', async () => {
    repository.find.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
    expect(repository.find).toHaveBeenCalledWith({ order: { updatedAt: 'DESC' } });
  });

  it('creates a project with defaults and trims user input', async () => {
    const entity = { name: 'Website', description: '', status: ProjectStatus.PLANNING, dueDate: null };
    repository.create.mockReturnValue(entity);
    repository.save.mockResolvedValue(entity);

    await service.create({ name: ' Website ' });

    expect(repository.create).toHaveBeenCalledWith(entity);
    expect(repository.save).toHaveBeenCalledWith(entity);
  });

  it('throws NotFoundException when a project does not exist', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});
