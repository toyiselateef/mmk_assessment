# mmk-api

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |
|DATABASE_URL           | database conncetion strings            |       |
|RedisHost           | Redis coninection host/address            |      |
|RedisPort           | Redis connection port            |       |
|RedisPassword          | Redis Password string            |      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.8.0


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3001`

- API Document endpoints

swagger-ui  Endpoint : http://localhost:3001/docs 


# TypeScript + Node 
The main purpose of this repository is to show a simple microservice that uses postgresql as database provider and redis for caching. The Rest APIs will be using the Swagger (OpenAPI) Specification, and supports cloud postgres and redis lab.




## Getting TypeScript
Add Typescript to project `npm`.
```
npm install -D typescript
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the output from build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **public**                  | Contains  static files to be served 
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/config**        | Database configuration, basically postgres 
| **src/controllers**      | Controllers defines functions to serve various express routes. 
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain express routes ('/sms/inbound' and '/sms/outbound'), separated by module/area of application and authenticate middleware         
| **src/validators**              | model/data validators that are used for validating request models.               
| **src**/server.ts         | Entry point to the API                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
                                                |

## Building the project
### Configuring TypeScript compilation
```json
{
    
  "compilerOptions": {
    "compilerOptions": {
      "target": "ES2019",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "sourceMap": true,
      "moduleResolution": "node",
      "types": [
      "reflect-metadata",
      "jest",
      "node"
    ] ,
    "esModuleInterop": true,
    "experimentalDecorators": true ,
    "skipLibCheck": true ,
    "forceConsistentCasingInFileNames": true
    },
    "lib": ["es2015"],

    "exclude": [
      "src/**/*.spec.ts",
      "test",
      "node_modules"
    
    ]
  }

```

### Running the build
Run and build MMK API with the following scripts:

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/server.js. Can be invoked with `npm  start`                  |
| `build`                   | Full build. Runs ALL build tasks with all watch tasks. Can be invoked with `npm build`        |
| `devStart`                   | Runs full build before starting all watch tasks. Can be invoked with `npm devStart`                                         |
| `test`                    | Runs build and run tests using mocha        |

## Testing
The tests are  written in jest and the assertions done using Chai

```
"jest": "^27.4.1",



```
```
npm run test

```

# Swagger
## Specification
The swagger specification file is located in the static folder ("public") as swagger.json. 

# Common Issues

## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.
## database connection error
The database needs to be up and running, also if theres ip whitelisting on your database ensure to whitelist the server hosting this api's ip address(es)


###sample request and response

inbound sms
    PATH : /sms/inbound
    Method : POST
    Parameters (Application Json)
        to*
        from*
         text*
        username*
         password*
    
    
    Headers :
        Content-Type : Application Json

    Sample Req :
     ```json
     {   
	        "to": "4223232435",
	        "from" : "42232446567",
	        "text" : "ok this is great",
          "username": "aed3",
	        "password" : "ksjdskjs2"
        }

        ```
    Sample Response :
      ```json  {
            "message": "inbound message ok",
            "error": "",
            
        }
```

  outbound sms
    PATH : /sms/outbound
    Method : POST
    Parameters (Application Json)
        to*
        from*
         text*
        username*
         password*
    
    
    Headers :
        Content-Type : Application Json

    Sample Req 
      ```json 
      {
         {
	        "to": "4223232435",
	        "from" : "42232446567",
	        "text" : "ok this is great",
            "username": "aed3",
	        "password" : "ksjdskjs2"
        }
        ```
    Sample Response 
       ```json 
       {

         {
            "message": "outbound message ok",
            "error": "",
            
        }
        
        ```