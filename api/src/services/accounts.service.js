import { users } from '../.data/users';
import { accounts } from '../.data/accounts';
import { recordExists, getLastId } from '../Helpers/helpers';
import UserService from './user.service';

/**
 * @exports
 * @class AccountService
 */

export default class AccountService {
  /**
   * Creates an instance of AccountService.
   * @memberof AccountService
   */
  constructor() {
    this.users = users;
    this.accounts = accounts;
  }

  /**
   * Get all account resources.
   * @param null
   * @returns {object}
   */
  getAllAccounts() {
    return this.accounts;
  }

  /**
   * Creates a new bank account.
   * @param {object} accountInfo
   * @returns {object}
   */
  addAccount(accountInfo) {
    const allAccounts = this.getAllAccounts();
    const newId = getLastId(allAccounts) + 1;
    const userAccounts = allAccounts.filter(account => {
      return account.owner === accountInfo.owner;
    });
    const account_type_exists = recordExists(userAccounts, accountInfo, 'type');

    if (account_type_exists) {
      return { message: `You already have a ${accountInfo.type} account`, error: true, code: 401 };
    } else {
      const account_number =
        Math.max(...this.getAllAccounts().map(account => account.accountNumber)) + 1;
      // console.log('Account number',account_number);
      const userService = new UserService();
      const userInfo = userService.getUserInfo(accountInfo.owner);
      if (!userInfo.error) {
        const { id, firstName, lastName, email } = userInfo.data;
        const newAccount = {
          id: newId,
          accountNumber: account_number,
          type: accountInfo.type,
          openingBalance: parseFloat(0.00),
          createdOn: new Date(),
          owner: id,
          firstName,
          lastName,
          email
        };

        return {
          message: 'Account Created successfully',
          error: false,
          code: 201,
          data: { ...newAccount }
        };
      } else {
        return {
          message: 'Error Creating Account User information required',
          error: true,
          code: 403
        };
      }
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
}
