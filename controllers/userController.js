const {User,Thought} = require('../models');

const userController ={
    getAllUsers(req, res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err)
            res.status(400).json(err);
        });
    },

    getUserById({params},res){
        User.findOne({_id:params.id})
        .populate('thoughts')
        .populate('friends')
        .select('__v')
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({msg: ' No user found with this Id'});
                return ;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}
