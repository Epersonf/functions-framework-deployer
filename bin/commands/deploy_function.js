// @ts-check

import { exec } from "child_process";
import { awaitChildProcess, readFunctionInfo } from "../utils.js";

const deployFunction = async () => {
  try {
    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const ogFunctionInfo = readFunctionInfo();

    const functionInfo = {
      ...ogFunctionInfo,
      ...ogFunctionInfo.overrides[stage]
    };

    let command = `gcloud functions deploy ${functionInfo.name}
  --gen2
  --project=${functionInfo.project}
  --runtime=${functionInfo.runtime}
  --region=${functionInfo.region}
  --source=${functionInfo.source}
  --set-env-vars STAGE=${stage},PROJECT=${functionInfo.project}
  --entry-point=${functionInfo.handler}
  ${functionInfo.params.join(" ")}`.replace(/( +(?= ))|\n/g, " ");

    command = command.replace("${stage}", stage);

    console.log(`Deploying function ${functionInfo.name.replace("${stage}", stage)} with command: ${command}`);

    const childProcess = exec(command);

    awaitChildProcess(childProcess);
  } catch (e) {
    console.log("Invalid function_info.json, or no function_info.json found in the root of the project. Run the init command to generate a valid function_info.json.");
  }

}

export default deployFunction;