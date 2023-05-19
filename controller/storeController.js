var storeModel = require('../model/store')
var query = require('../database/query')
var dbconnect = require ('../database/connection')
var  genrateStoreCode = require('../Util//utility')
    
exports.getAllStores = async (req , res) =>{
    try {
        var get_stores_query = query.queryList.GET_ALL_STORS;
        console.log("yes");
        var result = await dbconnect.DataBaseQuery(get_stores_query);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all stores'});
    }
}


exports.saveStore =  async (req , res) =>{
    try {
        var create_by = 'admin';
        var create_on = new Date();
        var store_name  = req.body.store_name;
        var store_address = req.body.address;
        if (!store_name || !store_address ){
            return res.status(500).send({error : 'store name and address be not empty '});
        }
        var store_code = genrateStoreCode.genrateStoreCode();
        values = [store_name , store_code ,store_address ,create_on, create_by ];
        var save_new_store = query.queryList.SAVE_NEW_STORE;
        await dbconnect.DataBaseQuery(save_new_store , values);
        
        return res.status(200).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save'});
    }
}