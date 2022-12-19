// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";


const deleteFunction = async () => {
  try {
    const functionInfo = readFunctionInfo();

    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const functionName = `${stage}-${functionInfo.name}`;

    const command = `gcloud functions delete ${functionName} --gen2 --region ${functionInfo.region}`.replace(/( +(?= ))|\n/g, " ")

    console.log(`Deleting function ${functionName} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);

  } catch (e) {
    console.log("No function_info.json found in the root of the project. Run the init command first.");
  }

}

export default deleteFunction;