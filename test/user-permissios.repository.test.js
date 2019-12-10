let context;

beforeEach(() => {
    jest.resetModules();
    context = require('../src/permissions.context');
    jest.mock('../src/permissions.context');
});

test('Should return a new a single permission', () => {
    context.load.mockImplementation(() => ({
        users: {
            'mvs@mvsouza.com': {
                '1': ['Morador']
            }
        },
        groups: {
            '1': {
                'Morador': {
                    'Reservas': 'Escrita',
                    'Entregas': 'Leitura',
                    'Usuarios': 'Nenhuma'
                }
            },
            '2': {
                'Morador': {
                    'Reservas': 'Nenhuma',
                    'Entregas': 'Leitura',
                    'Usuarios': 'Escrita'
                }
            }
        }
    }));

    const repository = require('../src/user-permissios.repository');

    const userPermissions = repository.getPermission('mvs@mvsouza.com');

    expect(userPermissions['1']).toBeTruthy();
    expect(userPermissions['1']['Reservas']).toEqual('Escrita');
    expect(userPermissions['1']['Entregas']).toEqual('Leitura');
    expect(userPermissions['1']['Usuarios']).toEqual('Nenhuma');
});


test('Should return a new a single permission from user in more than one group', () => {
    context.load.mockImplementation(() => ({
        users: {
            'mvs@mvsouza.com': {
                '1': ['Morador','Sindico']
            }
        },
        groups: {
            '1': {
                'Morador': {
                    'Reservas': 'Escrita',
                    'Entregas': 'Escrita',
                    'Usuarios': 'Nenhuma'
                },
                'Sindico':{
                    'Reservas': 'Leitura',
                    'Entregas': 'Nenhuma',
                    'Usuarios': 'Leitura'
                }

            }
        }
    }));

    const repository = require('../src/user-permissios.repository');

    const userPermissions = repository.getPermission('mvs@mvsouza.com');

    expect(userPermissions['1']).toBeTruthy();
    expect(userPermissions['1']['Reservas']).toEqual('Escrita');
    expect(userPermissions['1']['Entregas']).toEqual('Escrita');
    expect(userPermissions['1']['Usuarios']).toEqual('Leitura');
});

test('Should return a new a 2 residence permissions', () => {
    context.load.mockImplementation(() => ({
        users: {
            'mvs@mvsouza.com': {
                '1': ['Morador'],
                '2': ['Morador']
            }
        },
        groups: {
            '1': {
                'Morador': {
                    'Reservas': 'Escrita',
                    'Entregas': 'Leitura',
                    'Usuarios': 'Nenhuma'
                }
            },
            '2': {
                'Morador': {
                    'Reservas': 'Nenhuma',
                    'Entregas': 'Leitura',
                    'Usuarios': 'Escrita'
                }
            }
        }
    }));

    const repository = require('../src/user-permissios.repository');

    const userPermissions = repository.getPermission('mvs@mvsouza.com');

    expect(userPermissions['1']).toBeTruthy();
    expect(userPermissions['1']['Reservas']).toEqual('Escrita');
    expect(userPermissions['1']['Entregas']).toEqual('Leitura');
    expect(userPermissions['1']['Usuarios']).toEqual('Nenhuma');
    expect(userPermissions['2']['Reservas']).toEqual('Nenhuma');
    expect(userPermissions['2']['Entregas']).toEqual('Leitura');
    expect(userPermissions['2']['Usuarios']).toEqual('Escrita');
});
