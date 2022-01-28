import { Status } from "./ApiModel";

export interface Sales {
   data: DataSale[],
   message: string,
   status: Status,
   error: Status
}

export interface SalesPost {
   data?: DataSale[],
   message: string,
   status: Status
}

export type DataSale = {
   folio: string,
}
