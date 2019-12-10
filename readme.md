# User Permissions API

This API, currently, can be accessed via CLI.

``` bash
npm start <user email>
```

It will prompt the values as follow

``` bash
> access-api@0.0.1 start D:\Workspace\access-api
> node ./src/index.js

1;[(Reservas,Escrita),(Entregas,Nenhuma),(Usuarios,Leitura)]
```

To configure the input file, update the ```.env``` file with its path, just like that:

```
CONTEXT_FILE='./code-test Back-End.txt'
```