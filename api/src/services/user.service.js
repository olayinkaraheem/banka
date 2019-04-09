// import User from '../models/user.model';
import { users } from '../.data/users';
import { recordExists } from '../Helpers/helpers';

export default class UserService {
  constructor() {
    //   console.log(users);
    this.users = users;
  }

  getAllUsers() {
    // const users = this.users.map(user => {
    //   return new User({ ...user });
    // });

    return this.users;
  }

  addUser(user) {
    // const new_user = new User({ ...user });
    const email_exists = recordExists(this.getAllUsers(), user, 'email');
    if (email_exists) {
      return { message: 'Email already exist', error: true, code: 401 };
    } else {
      return { message: 'Signup successful', error: false, code: 201, data: user };
    }
  }
}
