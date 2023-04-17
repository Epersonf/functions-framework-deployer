// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";


const deleteFunction = async () => {
  try {
    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const ogFunctionInfo = readFunctionInfo();

    const functionInfo = {
      ...ogFunctionInfo,
      ...ogFunctionInfo.override[stage]
    };

    let command = `gcloud functions delete ${functionInfo.name} --project ${functionInfo.project} --gen2 --region ${functionInfo.region}`.replace(/( +(?= ))|\n/g, " ")

    command = command.replace("${stage}", stage);

    console.log(`Deleting function ${functionInfo.name.replace("${stage}", stage)} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);

  } catch (e) {
    console.log("Invalid function_info.json, or no function_info.json found in the root of the project. Run the init command to generate a valid function_info.json.");
  }

}

export default deleteFunction;