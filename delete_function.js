// @ts-check

import { exec } from "child_process";
import functionInfo from "./function_info.json";

const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

const functionName = `${stage}-${functionInfo.name}`;

const command = `gcloud functions delete ${functionName} --gen2 --region ${functionInfo.region}`

console.log(`Deleting function ${functionName} with command: ${command}`);

exec(command);