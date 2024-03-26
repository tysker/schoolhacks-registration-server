export interface WorkshopItem {
  title: string;
  description: string;
  instructor: string;
  date: string;
  weekday: string;
  time: string;
  location: string;
  price: string;
  image: string;
  seats: number;
  isEnded?: boolean;
  users?: String[];
}

export interface User {
  _id?: string;
  name: string;
  email: string;
}
