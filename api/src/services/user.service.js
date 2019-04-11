// import User from '../models/user.model';
import { users } from '../.data/users';
import { recordExists, getLastId, generateToken } from '../Helpers/helpers';

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
    const token = generateToken();
    if (email_exists) {
      return { message: 'Email already exist', error: true, code: 401 };
    } else {
      return {
        message: 'Signup successful',
        error: false,
        code: 201,
        data: { token, id: newId, ...user }
      };
    }
  }

  /**
   * Logs in a user.
   * @param {object} user
   * @returns {object}
   */
  loginUser(user) {
    const allUsers = this.getAllUsers();
    const email_exists = recordExists(allUsers, user, 'email');
    // const token = generateToken();
    if (!email_exists) {
      return { message: 'Users With This Email Does Not exist', error: true, code: 404 };
    } else {
      const validUser = allUsers.filter(db_user => {
        return user.password === db_user.password && user.email === db_user.email;
      });
      if (validUser.length) {
        return {
          message: 'Login successful',
          error: false,
          code: 200,
          data: { ...validUser[0] }
        };
      } else {
        return {
          message: 'Login Failed. Please enter a valid password',
          error: true,
          code: 401
        };
      }
    }
  }

  /**
   * Gets user information.
   * @param {number} userId
   * @returns {object}
   */
  getUserInfo(userId) {
    const userInfo = this.getAllUsers().filter(user => user.id === userId);

    if (!userInfo.length) {
      return { message: 'User information not found', error: true, code: 404 };
    } else {
      return {
        message: 'User Information Found',
        error: false,
        code: 200,
        data: { ...userInfo[0] }
      };
    }
  }
}
