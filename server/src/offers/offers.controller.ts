import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferResponse, OffersService } from './offers.service';
import RequestWithUser from 'src/auth/IRequestWithUser';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createOffer(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 3000 * 1000 }),
        ],
      }),
    )
    photo: Express.Multer.File,
    @Body() createOfferDto: CreateOfferDto,
    @Req() request: RequestWithUser,
  ): Promise<GetOfferResponse> {
    const newFileName =
      photo.fieldname + '-' + uuidv4() + extname(photo.originalname);

    return await this.offersService.createOffer(
      createOfferDto,
      newFileName,
      photo.buffer,
      request.user.musicianId,
    );
  }

  @Get('/musician')
  async findByMusician(@Req() request: RequestWithUser) {
    console.log(request.user.musicianId);
    return this.offersService.findByMusicianId(request.user.musicianId);
  }

  @Get()
  async findAll(): Promise<GetOfferResponse[]> {
    return this.offersService.findAll();
  }

  @Get('/count')
  async getOffersCount(): Promise<number> {
    return this.offersService.getOffersCount();
  }
}
