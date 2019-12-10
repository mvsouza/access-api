const fs = require('fs');

function extractUserGroups(groupString) {
    const groups = {};
    let match;
    const groupRegEx = /\((?<group>[A-Za-z0-9]+),(?<residence>[A-Za-z0-9]+)\)/g;
    while (match = groupRegEx.exec(groupString)) {
        const {group, residence} = match.groups;
        if (!groups[residence]) groups[residence] = [];
        groups[residence].push(group);
    }
    return groups;
}

function addUserEntry(entry) {
    const [_, email, groupString] = entry.match(/Usuario\;(?<email>.*);\[(?<groupString>.*)\]/);
    users[email] = extractUserGroups(groupString);
}

function extractGroupPermissions(permissionsString) {
    const permissions = {};
    const permissionsRegEx = /\((?<feature>[A-Za-z0-9]+),(?<access>[A-Za-z0-9]+)\)/g;
    let match;
    while (match = permissionsRegEx.exec(permissionsString)) {
        const {feature, access} = match.groups;
        permissions[feature] = access;
    }
    return permissions;
}

function addGroupEntry(entry) {
    const [_ , name, residence, permissionsString] = entry.match(/Grupo\;(?<name>[A-Za-z0-9]+);(?<residence>[A-Za-z0-9]+);\[(?<permissionsString>.+)\]/);
    if(!groups[residence]) {
        groups[residence] = {};
    }
    groups[residence][name] = extractGroupPermissions(permissionsString);
}

const parsers = [
    {
        prefix : 'Usuario',
        addParsedEntry: addUserEntry
    },
    {
        prefix : 'Grupo',
        addParsedEntry: addGroupEntry
    }
];

function parseEntry(entry){
    for(let parser of parsers){
        if(entry.startsWith(parser.prefix)){
            parser.addParsedEntry(entry);
            break;
        }
    }
}

const users = [];
const groups = [];

function load(){
    const contents = fs.readFileSync(process.env.CONTEXT_FILE, 'utf8');
    const inserts = contents.split('\n');

    inserts.forEach(parseEntry);

    return {
        users,
        groups
    }
}

module.exports = { load };