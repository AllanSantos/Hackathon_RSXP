import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const userExists = await User.findOne({ where: {email: req.body.email} });

    if (userExists) {
      //return res.json([userExists.email, userExists.name]);
      return res.status(400).json({error: 'User already exists.'});
    }

    const {name, email, age, scoreboard} = await User.create(req.body);

    return res.json(name, email, age, scoreboard);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().required(),
      age: Yup.number(),
      scoreboard: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: {email} });

      if (userExists) {
        //return res.json([userExists.email, userExists.name]);
        return res.status(400).json({error: 'User already exists.'});
      }
    }

    const { name, age, scoreboard } = await user.update(req.body);

    return res.json({name, email, age, scoreboard});
  }
}

export default new UserController();
