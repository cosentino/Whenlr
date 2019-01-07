import * as firebase from 'firebase';

export interface Item {
  userId: string;
  title: string;
  date: firebase.firestore.Timestamp;
}
export interface ItemId extends Item {
  id: string;
}
