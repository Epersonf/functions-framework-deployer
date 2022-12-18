#! /usr/bin/env node
import init from "./init.js";
import deployFunction from "./deploy_function.js";
import deleteFunction from "./delete_function.js";

const arg = process.argv[2];

if (arg === "init") {
  init();
} else if (arg === "deploy") {
  deployFunction();
} else if (arg === "delete") {
  deleteFunction();
} else {
  console.log("Command not found. Try: \n1 - init\n2 - deploy\n3 - delete");
}