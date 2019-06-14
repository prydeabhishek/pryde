const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
// const encryptedString = cryptr.encrypt('bacon');
// const decryptedString = cryptr.decrypt(encryptedString);

//console.log("DECRYDBDB  "+cryptr.decrypt("1f81063591fd66a565fb43089691199126c5006f778f65"))
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