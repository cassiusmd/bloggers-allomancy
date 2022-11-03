import {Store} from "./Store";

export default interface BloggerProductDto {
  id: string;
  name: string;
  image: string;
  startDate: Date;
  retrieved: Date;
  expireDate: Date;
  store?: Store;
}
