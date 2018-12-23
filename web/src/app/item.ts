export interface Item {
  userId: string;
  name: string;
  originalText?: string;
}
export interface ItemId extends Item {
  id: string;
}
