export interface Contact {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  homePhone: string;
  workPhone: string;
  city: string;
  address: string;
  workAddress: string;
  instagram: string;
  facebook: string;
  twitter: string;
  snapChat: string;
  birthDay: string;
  emailOrPhone?: string;
}

export interface ContactParams {
  orderBy?: string;
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}
