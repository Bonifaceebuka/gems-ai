import { IsNumber } from 'class-validator';

export class LoadPagesDto {
  @IsNumber({}, { message: "Page number is required" })
  page_number!: number;

  @IsNumber({}, { message: "Page data fetch limit is required" })
  data_fetch_limit!: number;

  @IsNumber({}, { message: "Page skip is required" })
  limit!: number;
}

export interface IPaginator {
  data: any[];
  total: number;
  currentPage: number;
  perPage: number;
}