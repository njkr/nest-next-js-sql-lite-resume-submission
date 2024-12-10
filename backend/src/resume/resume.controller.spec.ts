import { Test, TestingModule } from '@nestjs/testing';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { HttpStatus } from '@nestjs/common';

describe('ResumeController', () => {
  let controller: ResumeController;
  let resumeService: ResumeService;


  const mockResumeService = {
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [
        {
          provide: ResumeService,
          useValue: mockResumeService,
        },
      ],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);

  });


  describe('POST /resume', () => {
    it('should successfully create a resume', async () => {
      const createResumeDto: CreateResumeDto = {
        fullName: 'John Doe',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        preferredLocation: 'New York',
        programmingSkills: ['JavaScript', "Node.js"],
        resumeSummary: 'A skilled backend developer.',
      };

      const result = { id: 1, ...createResumeDto };
      mockResumeService.create.mockResolvedValue(result);

      const response = await controller.create(createResumeDto);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.message).toBe('Resume created successfully');
      expect(response.data).toEqual(result);
      expect(response.error).toBeUndefined();
    });

    it('should return an error when creating a resume fails', async () => {
      const createResumeDto: CreateResumeDto = {
        fullName: 'John Doe',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        preferredLocation: 'New York',
        programmingSkills: ['JavaScript', "Node.js"],
        resumeSummary: 'A skilled backend developer.',
      };

      const error = new Error('Failed to create resume');
      mockResumeService.create.mockRejectedValue(error);

      const response = await controller.create(createResumeDto);

      expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.message).toBe('Failed to create resume');
      expect(response.error).toEqual(error);
      expect(response.stack).toBeDefined();
    });
  });


  describe('GET /resume', () => {
    it('should successfully fetch resumes', async () => {
      const page = 1;
      const limit = 10;
      const result = [
        { id: 1, fullName: 'Jane Doe', preferredLocation: 'San Francisco' },
        { id: 2, fullName: 'John Smith', preferredLocation: 'Los Angeles' },
      ];

      mockResumeService.find.mockResolvedValue(result);

      const response = await controller.find(page, limit);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.message).toBe('Resume fetched successfully');
      expect(response.data).toEqual(result);
      expect(response.error).toBeUndefined();
    });

    it('should return an error when fetching resumes fails', async () => {
      const page = 1;
      const limit = 10;
      const error = new Error('Failed to fetch resume');

      mockResumeService.find.mockRejectedValue(error);

      const response = await controller.find(page, limit);

      expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.message).toBe('Failed to fetch resume');
      expect(response.error).toEqual(error);
      expect(response.stack).toBeDefined();
    });
  });
});
