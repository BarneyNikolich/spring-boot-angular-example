export class User {

  id: number;
  firstname: string;
  lastname: string;
  email: string;

  constructor(id: number, firstName: string, lastName: string, emaill: string) {
    this.id = id;
    this.firstname = firstName;
    this.lastname = lastName;
    this.email = emaill;
  }

}
