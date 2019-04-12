import Account from '../services/accounts.service';

export default class AccountController {
  createAccount(req, res) {
    const accountInfo = req.body;
    const account = new Account();
    const newAccount = account.addAccount(accountInfo);

    if (!newAccount.error) {
      return res.status(newAccount.code).send({ status: newAccount.code, data: newAccount.data });
    }
    return res.status(newAccount.code).send({ status: newAccount.code, error: newAccount.message });
  }

  updateAccountStatus(req, res) {
    const { status, userId } = req.body;
    const accountNumber = req.params.accountNumber;
    const account = new Account();
    const updatedAccount = account.updateAccountStatus({ status, accountNumber }, userId);

    if (!updatedAccount.error) {
      return res
        .status(updatedAccount.code)
        .send({ status: updatedAccount.code, data: updatedAccount.data });
    }
    return res
      .status(updatedAccount.code)
      .send({ status: updatedAccount.code, error: updatedAccount.message });
  }
}
