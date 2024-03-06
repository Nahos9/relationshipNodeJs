
export function userModel(sequelize,DataTypes){
    return sequelize.define('User',{
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        email : {
            type : DataTypes.STRING,
            allowNull: false,
            unique : {
                msg : 'Ce email existe déjà!!'
            },
            valide:{
                isEmail :{
                    msg : 'Vous devez respectez le format d\'un email'
                }
            }
        },
        password:{
            type : DataTypes.STRING,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        timestamps:true,
        createAt: 'created',
        updateAt: true

    })
}