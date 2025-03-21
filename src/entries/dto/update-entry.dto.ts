import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDto } from './create-entry.dto';

// this basically takes the validation i have from create entry dto but makes it optional, since its patch
export class UpdateEntryDto extends PartialType(CreateEntryDto) {}
