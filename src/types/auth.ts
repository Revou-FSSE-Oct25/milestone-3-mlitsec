export type AuthUser = {
  id: number;
  username: string;
  email?: string;
  name?: {
    firstname?: string;
    lastname?: string;
  };
};
