export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  phone?: string;
  permission: string;
}

export class Paginate {
  page: number;
  limit: number;
}

export class Pagination {
  total: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}
