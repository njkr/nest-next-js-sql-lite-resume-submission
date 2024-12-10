import { Controller, Post, Body, Get, Query, HttpStatus } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { responseHandler } from '../util/response-handler.util';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) { }

  @Get()
  async find(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {

    try {

      const result = await this.resumeService.find(page, limit);

      return responseHandler({
        data: result,
        message: 'Resume fetched successfully',
        statusCode: HttpStatus.OK,
      });

    } catch (error) {

      return responseHandler({
        error,
        message: 'Failed to fetch resume',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });

    }
  }

  @Post()
  async create(@Body() createResumeDto: CreateResumeDto) {

    try {

      const result = await this.resumeService.create(createResumeDto);

      return responseHandler({
        data: result,
        message: 'Resume created successfully',
        statusCode: HttpStatus.CREATED,
      });

    } catch (error) {

      return responseHandler({
        error,
        message: 'Failed to create resume',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });

    }
  }

}
