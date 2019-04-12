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
          openingBalance: parseFloat(0.0),
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
   * Activates/Deactvate a bank account.
   * @param {number} userId
   * @param {object} update
   * @returns {object}
   */
  updateAccountStatus(update, userId) {
    const users = new UserService();
    const allUsers = users.getAllUsers();
    const validUser = allUsers.filter(db_user => {
      return userId === db_user.id && db_user.isAdmin === true;
    });
    if (validUser.length) {
      const accountToUpdate = this.accounts.filter(account => {
        return account.accountNumber === parseInt(update.accountNumber);
      });
      if (accountToUpdate.length) {
        const allowedStatuses = ['deleted', 'dormant', 'active'];
        if (!allowedStatuses.includes(update.status)) {
          return {
            message: `Unidentified status specified`,
            error: true,
            code: 400
          };
        }
        if (update.status === 'deleted') {
          accountToUpdate[0].status = 'deleted';
          return {
            message: `Account deleted successfully`,
            error: false,
            code: 200
          };
        } else {
          accountToUpdate[0].status = accountToUpdate[0].status === 'active' ? 'dormant' : 'active';
          return {
            message: `Account Status successfully updated to '${accountToUpdate[0].status}'`,
            error: false,
            code: 200,
            data: { ...accountToUpdate[0] }
          };
        }
      } else {
        return {
          message: `Account number ${update.accountNumber} does not exist`,
          error: true,
          code: 404
        };
      }
    } else {
      return {
        message: 'You are not authorized to perform this action.',
        error: true,
        code: 403
      };
    }
  }
}
