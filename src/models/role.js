export function roleModel(sequelize,DataTypes){
    return sequelize.define('Role',{
        role_id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        libelle:{
            type : DataTypes.STRING,
            allowNull: true,
            unique : {
                msg : 'Ce rôle existe déjà'
            }
        }
    },{
        createdAt : 'created',
        timestamps: false,
        updatedAt: true
    })
}