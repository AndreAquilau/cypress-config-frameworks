### Estratégias frameworks e configurações

#### Dependências Do Projeto
* typescript
* cypress
* cypress-localstorage-commands
* @cypress/browserify-preprocessor
* __Opcional__: eslint e prettier
```bash
yarn add -D typescript cypress cypress-localstorage-commands @cypress/browserify-preprocessor
```

##### Instalar Cypress Local
```bash
npx cypress install --force
```
>peckage.json
```json
"scripts": {
  "cypress": "node_modules/.bin/cypress"
}
```
##### Iniciando Cypress Pela Primeira Vez Antes De Configurar
```bash
yarn cypress open
```

##### Criando Arquivo De Configuração Do Cypress
```json
{
  "integrationFolder": "cypress/integration",
  "supportFile": "cypress/support/index.ts",
  "videosFolder": "cypress/videos",
  "screenshotsFolder": "cypress/screenshots",
  "pluginsFile": "cypress/plugins/index.js",
  "fixturesFolder": "cypress/fixtures",
  "baseUrl": "http://localhost:4200",
  "chromeWebSecurity": false
}
```

#### Modificações No Projetos Para o Typescript
>cypress/plugins/index.js
```js
/// <reference types="cypress" />

const browserify = require('@cypress/browserify-preprocessor')

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const options = {
    typescript: require.resolve('typescript'),
  }

  on('file:preprocessor', browserify(options))
}
```
>cypress/tsconfig.json
```json
{
    "extends": "../tsconfig.json",
    "include": [
        "../node_modules/cypress",
        "*/*.ts",
        "plugins/index.js",
    ]
}
```
>tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "lib": ["DOM", "ES2015", "ESNext"],
    "allowJs": true,
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {},
    "rootDirs": [],
    "typeRoots": [],
    "types": [
        "cypress",
        "node",
        "cypress-localstorage-commands"
    ],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
      "**/*.ts"
  ],
  "exclude": ["node_modules"]
}

```
#### Adicionando Suporte A Comandos LocalStorege
>cypress/support/commands.ts
```ts
import "cypress-localstorage-commands"
```
>cypress/support/index.ts
```ts
/// <reference types="cypress" />

import './commands'
```
#### Adicionando Tipagem De Arquivos Fixtures E Comandos
>tsconfig.json
```json
{
  "typeRoots": [
    "node_modules/@types"
  ],
  "types": [
    "cypress",
    "node",
    "../../cypress/@types",
    "cypress-localstorage-commands"
  ],
}
```
>cypress/@types/fixture.d.ts
```ts
declare type ExampleJSON = {
  nome: string;
  apelido: string;
  email: string;
  sexo: string;
  telefone: string;
  fichaDeNacimento: string[];
  subjects: string;
  hobbies: string[];
  image: string;
  direccion: string;
  estado: string;
  cidade: string;
};
```
>cypress/@types/cypress.d.ts
```ts
declare namespace Cypress {
  interface Chainable {
    // add commands type
    // login: () => Chainable<Element>
    // authUser: () => Chainable<Element>
    // devtools: (url: string) => Chainable<Element>
  }
}
```

#### Ambientes De Teste Produção E Desenvolvimento
>environment/cypress-config-development.json
```json
{
    "integrationFolder": "cypress/integration",
    "supportFile": "cypress/support/index.ts",
    "videosFolder": "cypress/videos",
    "screenshotsFolder": "cypress/screenshots",
    "pluginsFile": "cypress/plugins/index.js",
    "fixturesFolder": "cypress/fixtures",
    "baseUrl": "http://localhost:4200",
    "chromeWebSecurity": false,
    "viewportWidth": 1500,
    "viewportHeight": 1170,
    "env":{
    }
  }
```
>environment/cypress-config-production.json
```json
{
    "integrationFolder": "cypress/integration",
    "supportFile": "cypress/support/index.ts",
    "videosFolder": "cypress/videos",
    "screenshotsFolder": "cypress/screenshots",
    "pluginsFile": "cypress/plugins/index.js",
    "fixturesFolder": "cypress/fixtures",
    "baseUrl": "http://localhost:4200",
    "chromeWebSecurity": false,
    "viewportWidth": 1500,
    "viewportHeight": 1170,
    "env":{
    }
  }
```
#### Scripts De Execução Do Projeto
```json
{
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "cypress": "node_modules/.bin/cypress",
    "cypress-prod:open": "cypress open --config-file tests/cypress-config-production.json",
    "cypress-prod:run": "cypress run --config-file tests/cypress-config-production.json",
    "cypress-dev:open": "cypress open --config-file tests/cypress-config-development.json",
    "cypress-dev:run": "cypress run --config-file tests/cypress-config-development.json"
  },
}
```
