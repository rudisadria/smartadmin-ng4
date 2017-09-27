export class User {
    grant_type: string;
    username: string;
    password: string;
    client_id: string;
    client_secret: string;
    access_token: string;
    refresh_token: string;
    remember:boolean = false;
    jti: string
  }