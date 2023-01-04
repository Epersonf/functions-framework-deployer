// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";


const deleteFunction = async () => {
  try {
    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const ogFunctionInfo = readFunctionInfo();

    const functionInfo = {
      ...ogFunctionInfo,
      ...ogFunctionInfo.overrides[stage]
    };

    const command = `gcloud functions delete ${functionInfo.name} --project ${functionInfo.project} --gen2 --region ${functionInfo.region}`.replace(/( +(?= ))|\n/g, " ")

    console.log(`Deleting function ${functionInfo.name} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);

  } catch (e) {
    console.log("No function_info.json found in the root of the project. Run the init command first.");
  }

}

export default deleteFunction;