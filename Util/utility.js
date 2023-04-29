var randomstring = require('randomstring')

exports.genrateStoreCode = ()=>{
    return randomstring.generate({
        length : 5 , 
        charset : 'alphabetic',
        capitalization : 'uppercase'
    });
}