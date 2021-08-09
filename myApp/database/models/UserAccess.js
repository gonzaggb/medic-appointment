module.exports = (sequelize, dataTypes) => {
    const alias = 'UserAccess'
    const columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        rolId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }

    }
    const config = {
        tableName: 'user_access',
        timestamps: false,
        underscored: true
    }

    const UserAccess = sequelize.define(alias, columns, config);


    return UserAccess;
}
