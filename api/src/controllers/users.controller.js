import User from '../services/user.service';

export default class UsersController {
  signupUser(req, res) {
    const user_data = req.body;
    const user = new User();
    const new_user = user.addUser(user_data);

    if (!new_user.error) {
      return res.status(new_user.code).send({ status: 201, data: new_user.data });
    }
    return res.status(new_user.code).send({ status: 401, message: new_user.message });
  }
}
