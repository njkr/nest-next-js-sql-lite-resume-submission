import { Test, TestingModule } from '@nestjs/testing';
import { ResumeService } from './resume.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ResumeService', () => {
  let service: ResumeService;
  let prismaMock: { resumes: { create: jest.Mock; findMany: jest.Mock } };

  beforeEach(async () => {
    prismaMock = {
      resumes: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ResumeService>(ResumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new resume', async () => {
      const mockData = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        preferredLocation: 'New York',
        programmingSkills: ['JavaScript', 'TypeScript'],
        resumeSummary: 'A passionate developer.',
      };

      const mockResume = { ...mockData, createdDate: new Date() };

      prismaMock.resumes.create.mockResolvedValue(mockResume);

      const result = await service.create(mockData);

      expect(result).toEqual(mockResume);
      expect(prismaMock.resumes.create).toHaveBeenCalledWith({
        data: {
          fullName: mockData.fullName,
          dateOfBirth: new Date(mockData.dateOfBirth),
          preferredLocation: mockData.preferredLocation,
          programmingSkills: mockData.programmingSkills.join(','),
          resumeSummary: mockData.resumeSummary,
          createdDate: expect.any(Date),
        },
      });
    });
  });

  describe('find', () => {
    it('should return a list of resumes', async () => {
      const mockResumes = [
        { id: 1, fullName: 'John Doe', programmingSkills: 'JavaScript,TypeScript' },
        { id: 2, fullName: 'Jane Doe', programmingSkills: 'Python,Java' },
      ];

      prismaMock.resumes.findMany.mockResolvedValue(mockResumes);

      const result = await service.find(0, 10);

      expect(result).toEqual([
        { id: 1, fullName: 'John Doe', programmingSkills: ['JavaScript', 'TypeScript'] },
        { id: 2, fullName: 'Jane Doe', programmingSkills: ['Python', 'Java'] },
      ]);
      expect(prismaMock.resumes.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });
});
