// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";

const deployFunction = async () => {
  try {
    const functionInfo = readFunctionInfo();

    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const functionName = `${stage}-${functionInfo.name}`;

    const command = `gcloud functions deploy ${functionName}
  --gen2
  --runtime=${functionInfo.runtime}
  --region=${functionInfo.region}
  --source=${functionInfo.source}
  --set-env-vars STAGE=${stage}
  --entry-point=${functionInfo.handler}
  ${functionInfo.params.join(" ")}`.replace(/( +(?= ))|\n/g, " ").replace("${stage}", stage)

    console.log(`Deploying function ${functionInfo.name} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);
  } catch (e) {
    console.log("No function_info.json found in the root of the project. Run the init command first.");
  }

}

export default deployFunction;