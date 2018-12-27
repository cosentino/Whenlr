import { Timestamp } from 'firebase/firestore';

export interface Item {
  userId: string;
  title: string;
  date: Date | Timestamp;
}
export interface ItemId extends Item {
  id: string;
}
