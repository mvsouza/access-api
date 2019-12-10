const context =  require('./permissions.context').load();

function getPermission(email) {
    const  user = context.users[email];
    const allPermissions = {};

    for (let residence of Object.keys(user)) {
        allPermissions[residence] = squash(getGroupPermissions(user, residence));
    }
    return allPermissions;
}
// TODO find it out dynamically
function defaulPermisson(skeleton) {
    return {
        'Reservas': 'Nenhuma',
        'Entregas': 'Nenhuma',
        'Usuarios': 'Nenhuma'
    };
}

const permissionIndex = {
    'Escrita':3,
    'Leitura':2,
    'Nenhuma':1
};

function higher(higher, lower) {
    return permissionIndex[higher] > permissionIndex[lower];
}

function squash (groups){
    const result = defaulPermisson();
    for (let group of groups)
        for (let key of Object.keys(group))
            if(higher(group[key], result[key]))
                result[key]=group[key];
    return result;
}

function* getGroupPermissions(groups, residence) {
    for (let group of groups[residence])
        yield context.groups[residence][group];
}

module.exports = {
    getPermission
};
