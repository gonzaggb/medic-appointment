module.exports = (sequelize, dataTypes) => {
    const alias = 'Rol'
    const columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
              
    }
    const config = {
        tableName: 'roles',
        timestamps: false,
        underscored: true
    }

    const Rol = sequelize.define(alias, columns, config);
    Rol.associate = function(models){
    Rol.belongsToMany(models.User, {
        as: 'users',
        through: 'user_access',
        foreignKey: 'user_id',
        otherKey: 'rol_id',
        timestamps: false
    })
    }

    return Rol;
   }
