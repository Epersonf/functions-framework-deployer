# Package ff-deployer

This is a simple tool to deploy a Functions Framework based application to Cloud Run.

## Usage

To install this tool, run: `npm install ff-deployer`

After installing it you can run: `npx ff-deployer init`

This will ask some questions and create a `function_info.json` file in your project. This file contains the configuration for your deployment similar to that:

```json
{
  "name": "my-first-function",
  "handler": "main",
  "region": "us-east1",
  "runtime": "nodejs16",
  "source": ".",
  "project": "my-first-project-dev",
  "params":  [
    "--trigger-http",
    "--allow-unauthenticated"
  ],
  "overrides": {
    "hml": {
      "project": "my-first-project-hml",
    },
    "prod": {
      "project": "my-first-project-prod",
    }
  }
}
```

After creating the file, you can run `npx ff-deployer deploy` to deploy your application to Cloud Run.

And you can delete your deployment with `npx ff-deployer delete`.

## Configuration

The `function_info.json` file has the following configuration:

- `name`: The name of your function. This will be used to create the Cloud Run service.
- `handler`: The name of the function to be executed. This is the name of the function exported in your `index.js` file.
- `region`: The region where your function will be deployed.
- `runtime`: The runtime of your function. This can be `nodejs16`, `nodejs14` etc.
- `source`: The source directory of your function. This is the directory where your `index.js` file is located.
- `project`: The default project where your function will be deployed.
- `params`: The parameters that will be passed to the `gcloud run deploy` command.
- `overrides`: This is an object that contains the configuration for each environment. The key of each object is the name of the environment. The value of each object is the configuration for that environment. The configuration for each environment can be the same as the default configuration or it can be different.

## Arguments

When running `npx ff-deployer deploy` or `npx ff-deployer delete` you can pass the following arguments:

- `--stage`: The stage of your application. This will be used to get the configuration for that stage from the `overrides` object. If you don't pass this argument, or the stage doesn't exist in the `overrides` object, the default configuration will be used.

## Variables

The `function_info.json` file supports variables, like the reserved word ${stage}, that will be replaced by the value of the stage passed in the command line. For example, if you pass `--stage=hml` in the command line, the value of the project will be replaced by the value of the project in the `hml` object.

If you add ${stage} in the `name` field, for example '${stage}-my-first-function', the name of the Cloud Run service will be 'hml-my-first-function'.

## Environment variables

There are some environment variables that are deployed to the Cloud Run service. These variables are:

- `STAGE`: The stage of the application. This is the value of the stage passed in the command line.
- `PROJECT`: The project where the application is deployed. This is the value of the project in the configuration file.