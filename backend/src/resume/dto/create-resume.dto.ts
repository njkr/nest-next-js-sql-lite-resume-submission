import { Transform } from 'class-transformer';
import { IsString, IsDate, MaxLength, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';


function sanitizeInput(value: string): string {
    return value.trim().replace(/[<>%$';"]/g, '');
}

export class CreateResumeDto {
    @IsString()
    @MaxLength(50, { message: 'Must be 50 characters or less' })
    @IsNotEmpty({ message: 'Required' })
    @Transform(({ value }) => sanitizeInput(value))
    fullName: string;

    @IsDate()
    @IsNotEmpty({ message: 'Required' })
    dateOfBirth: Date;

    @IsString()
    @IsNotEmpty({ message: 'Required' })
    @Transform(({ value }) => sanitizeInput(value))
    preferredLocation: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'Select at least one skill' })
    @IsNotEmpty({ message: 'Required' })
    @Transform(({ value }) => value.map(sanitizeInput))  // Sanitize each element
    programmingSkills: string[];

    @IsString()
    @MaxLength(250, { message: 'Must be 250 characters or less' })
    @IsNotEmpty({ message: 'Required' })
    @Transform(({ value }) => sanitizeInput(value))
    resumeSummary: string;
}
