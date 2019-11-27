import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize){
    super.init({
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      age: Sequelize.INTEGER,
      scoreboard: Sequelize.FLOAT,
    },
    {
      sequelize,
    });
  }
}

export default User;
