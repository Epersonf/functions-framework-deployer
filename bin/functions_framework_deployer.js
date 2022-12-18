#! /usr/bin/env node
import init from "./init";
import deleteFunction from "./delete_function";
import deployFunction from "./deploy_function";

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