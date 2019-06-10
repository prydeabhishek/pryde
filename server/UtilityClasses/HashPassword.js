const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

//console.log("DECRYDBDB  "+cryptr.decrypt("4392f206c03547ec10d83909cb24eeabe775b671107d92"))
module.exports={
    encrypt:(value)=>{
        console.log(cryptr.encrypt(value));   //testing
        return cryptr.encrypt(value);
        
    },
    decrypt:(value)=>{
        console.log(cryptr.decrypt(value));   //testing
        return cryptr.decrypt(value)
    }

}