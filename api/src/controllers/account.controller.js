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
}
