export interface User {
  id?: number;
  username?: string | null | undefined;
  error?: string | null | undefined;
  company?: string;
  tsoAbbreviation?: string;
  email?: string | null | undefined;
  role?: number;
  token?: string;
  company_id?: string;
}
