# functions-framework-deployer

This is a simple tool to deploy a Functions Framework based application to Cloud Run.

## Usage

To install this tool, run: `npm install ff-deployer`

After installing it you can run: `npx ff-deployer init`

This will ask some questions and create a `functions_info.json` file in your project. This file contains the configuration for your deployment similar to that:

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

The `functions_info.json` file has the following configuration:

- `name`: The name of your function. This will be used to create the Cloud Run service.
- `handler`: The name of the function to be executed. This is the name of the function exported in your `index.js` file.
- `region`: The region where your function will be deployed.
- `runtime`: The runtime of your function. This can be `nodejs16`, `nodejs14` etc.
- `source`: The source directory of your function. This is the directory where your `index.js` file is located.
- `project`: The default project where your function will be deployed.
- `params`: The parameters that will be passed to the `gcloud run deploy` command.
- `overrides`: This is an object that contains the configuration for each environment. The key of each object is the name of the environment. The value of each object is the configuration for that environment. The configuration for each environment can be the same as the default configuration or it can be different.
