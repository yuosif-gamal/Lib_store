
var query = require('../database/query')
var dbconnect = require ('../database/connection')
var validationUtil = require('../Util/validation')


exports.getAllUsers = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var get_all_users = query.queryList.GET_ALL_USERS;
        var result = await dbconnect.DataBaseQuery(get_all_users);
        console.log('get_all_users ' );
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Users'});
    }
}

exports.getUserDetails = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var id = req.params.id;
        var get_user_details = query.queryList.GET_USER_DETAILS;
        console.log('get_user_details' + " in id : " + id );
        var result = await dbconnect.DataBaseQuery(get_user_details,[id]);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select  User with id' + id});
    }
}
 

 
exports.register =  async (req , res) =>{
    try {
        console.log('in controller .. ');
        var create_on = new Date();
        var username = req.body.username;
        var password = req.body.password;
        var email  = req.body.email;
        if (!email || !password || !username ){
            return res.status(500).send({error : ' username and email and pass should be not empty '});
        }
        var is_user_exist = query.queryList.IS_USER_EXIST_QUERY;
        var result =await dbconnect.DataBaseQuery(is_user_exist , [username , email]);
        console.log("Result : " + JSON.stringify(result))
        if (result.rows[0].count != "0") {
            return res.status(500).send({ error: 'User already Exists' })
        }
        values = [username , password ,email ,create_on ];
        console.log(values);
        if(!validationUtil.isValidEmail(email)){
            return res.status(500).send({ error: 'Email is not valid' })
        }

        if(!validationUtil.isValidPassword(password)){
            return res.status(500).send({ error: 'Password is not valid' })
        }

        var save_new_user = query.queryList.SAVE_NEW_USER;
        console.log('save_nesave_new_userw_book');
        await dbconnect.DataBaseQuery(save_new_user , values);
        
        return res.status(201).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save this user'});
    }
}

 