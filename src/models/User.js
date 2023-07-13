import Sequelize, { Model } from 'sequelize';
import bcrypjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 40],
              msg: 'Nome deve ter entre 4 e 40 caracteres',
            },
          },
        },

        senha: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [8, 16],
              msg: 'Senha deve ter entre 8 e 16 caracteres',
              isLowercase: {
                arg: true,
                msg: 'Senha deve ter ao menos uma letra minuscula',
              },
              isUppercase: {
                arg: true,
                msg: 'Senha deve ter ao menos uma letra maiscula',
              },
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              arg: true,
              msg: 'Email inválido',
            },
          },
        },

        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          // validate: {
          //   is: {
          //     // eslint-disable-next-line
          //     arg: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
          //     msg: 'CPF inválido',
          //   },

          //   unique: {
          //     arg: true,
          //     msg: 'CPF já cadastrado',
          //   },
          // },
        },

        cep: {
          type: Sequelize.STRING,
          allowNull: false,
          // validate: {
          //   is: {
          //     arg: /^[0-9]{5}[0-9]{3}$/,
          //     msg: 'CEP inválido',
          //   },
          // },
        },
      },
      {
        sequelize,
        instanceMethods: {},
      }
    );

    this.addHook('beforeSave', async (user) => {
      // eslint-disable-next-line
      user.senha = await bcrypjs.hash(user.senha, 8);
    });

    return this;
  }
}

User.prototype.validPassword = function (senha) {
  try {
    const valid = bcrypjs.compareSync(senha, this.senha);
    return valid;
  } catch (error) {
    return false;
  }
};
