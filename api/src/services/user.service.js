// import User from '../models/user.model';
import { users } from '../.data/users';
import { recordExists, getLastId } from '../Helpers/helpers';

/**
 * @exports
 * @class UserService
 */

export default class UserService {
  /**
   * Creates an instance of UserService.
   * @memberof User
   */
  constructor() {
    this.users = users;
  }

  /**
   * Get all user resources.
   * @param null
   * @returns {object}
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * Creates a new user.
   * @param {object} user
   * @returns {object}
   */
  addUser(user) {
    // const new_user = new User({ ...user });
    const allUsers = this.getAllUsers();
    const newId = getLastId(allUsers) + 1;
    const email_exists = recordExists(allUsers, user, 'email');
    if (email_exists) {
      return { message: 'Email already exist', error: true, code: 401 };
    } else {
      return {
        message: 'Signup successful',
        error: false,
        code: 201,
        data: { id: newId, ...user }
      };
    }
  }
}
