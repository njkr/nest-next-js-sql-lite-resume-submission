import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) { }
  async create(data: any) {
    return await this.prisma.resumes.create({
      data: {
        fullName: data.fullName,
        dateOfBirth: new Date(data.dateOfBirth),
        preferredLocation: data.preferredLocation,
        programmingSkills: data.programmingSkills.join(','),
        resumeSummary: data.resumeSummary,
        createdDate: new Date(),  // You can set it dynamically
      },
    });
  }

  async find(page: number = 0, limit: number = 10) {
    const data = await this.prisma.resumes.findMany({
      skip: (page) * limit,
      take: limit,
      orderBy: { id: 'desc' },
    });

    return data.map(values => ({ ...values, programmingSkills: values.programmingSkills.split(',') }));

  }

}
