import { ApiDTO,  Status } from './ApiDTO';

export interface SalesDTO extends ApiDTO {
   data: DataSales[],
   errors?: any | null,
   message: string,
   timestamp: string
}

export interface SalePostDTO extends ApiDTO {
   data?: DataSales[],
   status: Status,
   message: string,
   timestamp: string
}

export type Payload= {
   merchant_id: string,
   type: string,
   created_at: string,
   receipts: any
}

export type DataSales = {
   _id: string,
   payload: Payload,
   createdAt: string,
   updatedAt: string,
   __v: string,
}
