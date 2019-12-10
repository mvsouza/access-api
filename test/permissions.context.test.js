let fileContent;
let fs;

beforeEach(() => {
    jest.resetModules()
    fs = require('fs');
    jest.mock('fs');
});

test('Should contain a single with single role', () => {
    fileContent = "Usuario;marcos.fraga@gmail.com;[(Morador,1)]";
    fs.readFileSync.mockImplementation(() => fileContent);

    const permissionsContext = require('../src/permissions.context');
    context = permissionsContext.load();

    expect(context.users['marcos.fraga@gmail.com']).toBeTruthy();
    expect(context.users['marcos.fraga@gmail.com']['1']).toHaveLength(1);
    expect(context.users['marcos.fraga@gmail.com']['1']).toContain('Morador');
});

test('Should have a user with 2 roles in a residence', () => {
    fileContent = "Usuario;marcos.fraga@gmail.com;[(Morador,1),(Sindico,1)]";
    fs.readFileSync.mockImplementation(() => fileContent);

    const permissionsContext = require('../src/permissions.context');
    context = permissionsContext.load();

    expect(context.users['marcos.fraga@gmail.com']).toBeTruthy();
    expect(context.users['marcos.fraga@gmail.com']['1']).toHaveLength(2);
    expect(context.users['marcos.fraga@gmail.com']['1']).toContain('Morador');
    expect(context.users['marcos.fraga@gmail.com']['1']).toContain('Sindico');
});

test('Should have a user on on 2 residences with different roles', () => {
    fileContent = "Usuario;marcos.fraga@gmail.com;[(Morador,2),(Sindico,1)]";
    fs.readFileSync.mockImplementation(() => fileContent);

    const permissionsContext = require('../src/permissions.context');
    context = permissionsContext.load();

    expect(context.users['marcos.fraga@gmail.com']).toBeTruthy();
    expect(context.users['marcos.fraga@gmail.com']['1']).toHaveLength(1);
    expect(context.users['marcos.fraga@gmail.com']['1']).toContain('Sindico');
    expect(context.users['marcos.fraga@gmail.com']['2']).toHaveLength(1);
    expect(context.users['marcos.fraga@gmail.com']['2']).toContain('Morador');
});

test('Should contain a group', () => {
    fileContent = 'Grupo;Sindico;1;[(Reservas,Escrita),(Entregas,Leitura),(Usuarios,Escrita)]';
    fs.readFileSync.mockImplementation(() => fileContent);

    const permissionsContext = require('../src/permissions.context');
    context = permissionsContext.load();

    expect(context.groups['1']).toBeTruthy();
    expect(context.groups['1']['Sindico']).toBeTruthy();
    expect(context.groups['1']['Sindico']['Reservas']).toEqual('Escrita');
    expect(context.groups['1']['Sindico']['Entregas']).toEqual('Leitura');
    expect(context.groups['1']['Sindico']['Usuarios']).toEqual('Escrita');
});