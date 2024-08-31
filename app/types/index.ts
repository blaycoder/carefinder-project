export interface Hospital {
  id: number | string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  description ?: string,
  state?:{
    name: string
  },
  type?:{
    name: string,
  }
}


