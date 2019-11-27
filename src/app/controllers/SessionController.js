import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().required(),
      age: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const { email } = req.body;

    const user = await User.findOne({where : { email }});

    if (!user) {
      res.status(401).json({error: 'User not found'});
    }

    const { id, name, age, scoreboard } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        age,
        scoreboard,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController();