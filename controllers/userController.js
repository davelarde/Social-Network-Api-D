const {User,Thought} = require('../models');
// get all users
const userController ={
    getAllUsers(req, res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err)
            res.status(400).json(err);
        });
    },
// get user by id
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

    // this one is to create a user

    createUser({body},res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // to update by id
    updateUser({params,body},res){
        User.findOneAndUpdate({_id:params.id},body,{new: true, runValidators: true})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({msg:'No user has this Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // to delete user

    deleteUser({params},res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData =>{
            if(!dbUserData){
                return res.status(404).json({msg:'No user with this Id'});

            }

        })
        .then(()=>{
            res.json({msg:'This user has been deleted'});
        })
        .catch(err => res.status(400).json(err));
    },

    // to add a friend

    addFriend({params}, res){
        User.findOneAndUpdate({_id: params.id},{$addToSet: { friends: params.friendId}},{runValidators:true})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({msg:'No user found with this id'});
                return ;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // remove friend

    removeFriend({params}, res){
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {runValidators: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({msg:'No user found with this id'});
                return;  
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
}
module.exports = userController;