#! /usr/bin/env node
import init from "./commands/init.js";
import deployFunction from "./commands/deploy_function.js";
import deleteFunction from "./commands/delete_function.js";

const arg = process.argv[2];

switch (arg) {
  case "init":
    init();
    break;
  case "deploy":
    deployFunction();
    break;
  case "delete":
    deleteFunction();
    break;
  default:
    console.log("Command not found. Try: \n1 - init\n2 - deploy\n3 - delete");
}
