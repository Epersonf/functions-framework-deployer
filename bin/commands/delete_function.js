// @ts-check

import { exec } from "child_process";
import { awaitChildProcess } from "../utils.js";


const deleteFunction = async () => {
  // @ts-ignore
  const functionInfo = await import("../../function_info.json");

  if (functionInfo) {

    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const functionName = `${stage}-${functionInfo.name}`;

    const command = `gcloud functions delete ${functionName} --gen2 --region ${functionInfo.region}`

    console.log(`Deleting function ${functionName} with command: ${command}`);

    const childProcess = exec(command);

    childProcess.on("data", (data) => {
      console.log(data);
    });

    awaitChildProcess(childProcess);

  } else {
    console.log("No function_info.json found in the root of the project. Run the init command first.");
  }

}

export default deleteFunction;