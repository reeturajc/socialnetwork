/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

export interface Post {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  image: string;
  userId?: string;
}
