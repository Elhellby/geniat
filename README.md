
  

# geniat

  

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 18.7.0

  

# Getting started

- Clone the repository

```

git clone https://github.com/Elhellby/geniat.git

```

- Install dependencies

```

cd geniat

npm install

```

  

- Start Database

Previously change configuration with valid credential for sql server in file **src/config/config.json** and **.evn**

- Run command
```

npx sequelize db:migrate

```

In case command not work, try run script **createDatabase.sql**

- Build and run the project

```

npm run dev

```

Navigate to `http://localhost:12345`

- API Document endpoints

Endpoints configured in file **Services.postman_collection.json**

  

### Using the debugger in VS Code

Node.js debugging in VS Code is easy to setup and even easier to use.

Press `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.

  

```json

{

"version": "0.2.0",

"configurations": [

{

"type": "node",

"request": "launch",

"name": "Iniciar el programa",

"skipFiles": ["<node_internals>/**"],

"program": "${workspaceFolder}/src/app.js",

"runtimeExecutable":"${workspaceRoot}/node_modules/nodemon/bin/nodemon.js"

}

]

}

```