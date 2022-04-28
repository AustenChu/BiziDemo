export interface User {
  uid: number;
  name: string;
  email: string;
  password: string;
  hid?: number;
}

export interface Household {
  hid: number;
  name: string;
  members?: number[];
  notes?: JSON[];
}

export interface Message {
  source: string;
  content: string;
}

