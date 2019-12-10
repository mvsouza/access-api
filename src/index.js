require('dotenv').config();

const repository = require('./user-permissios.repository');

var args = process.argv.slice(2);
if(!args[0])
{
    console.log("Please pass an email as parameter!");
    return;
}
var userPermission = repository.getPermission(args[0]);

for(let residence in userPermission) {
    const permissions = [];
    for (let permission in userPermission[residence]){
        permissions.push(`(${permission},${userPermission[residence][permission]})`)
    }
    console.log(`${residence};[${permissions.join(',')}]`);
}

