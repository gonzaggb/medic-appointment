module.exports = (sequelize, dataTypes) => {
    const alias = 'User'
    const columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        birthDate: {
            type: dataTypes.DATE,
        },
        dni: {
            type: dataTypes.INTEGER,
            unique: true,
            unsigned: true,
            allowNull: false
        },
        adress: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        zipCode: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        socialNetwork: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false

        }

        
    }
    const config = {
        tableName: 'users',
        timestamps: false,
        underscored: true
    }

    const User = sequelize.define(alias, columns, config);
    User.associate = function (models){
    User.belongsToMany(models.Rol, {
        as: 'roles',
        through: 'user_access',
        foreignKey: 'rol_id',
        otherKey: 'user_id',
        timestamps: false
    })
    }

    return User;
   }