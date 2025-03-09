const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const roles = ['user', 'admin', 'superadmin', 'moderator'];

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(roles),
        defaultValue: 'user'
    }
});

const initialize = async () => {
    await sequelize.sync({ force: true });

    await UserModel.bulkCreate([
        {
            username: 'user1',
            email: 'user1@example.com',
            password: 'password1',
            role: 'user'
        },
        {
            username: 'admin1',
            email: 'admin1@example.com',
            password: 'password2',
            role: 'admin'
        },
        {
            username: 'superadmin1',
            email: 'superadmin1@example.com',
            password: 'password3',
            role: 'superadmin'
        },
        {
            username: 'moderator1',
            email: 'moderator1@example.com',
            password: 'password3',
            role: 'moderator'
        }
    ]);

    console.log('Users have been added');
};

initialize().catch(error => {
    console.error('Error initializing database:', error);
});

const requestLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
}

module.exports = { UserModel, sequelize };