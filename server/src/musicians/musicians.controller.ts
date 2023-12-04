import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MusiciansService } from './musicians.service';

@ApiTags('Музыканты')
@Controller('musicians')
export class MusiciansController {
  constructor(private musiciansService: MusiciansService) {}
}
