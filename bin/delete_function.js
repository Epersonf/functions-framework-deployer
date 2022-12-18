// @ts-check

import { exec } from "child_process";


const deleteFunction = async () => {
  // @ts-ignore
  const functionInfo = await import("./function_info.json");

  if (functionInfo) {

    const stage = process.argv.find((arg) => arg.startsWith("--stage="))?.split("=")[1] || "dev";

    const functionName = `${stage}-${functionInfo.name}`;

    const command = `gcloud functions delete ${functionName} --gen2 --region ${functionInfo.region}`

    console.log(`Deleting function ${functionName} with command: ${command}`);

    exec(command);

  } else {
    console.log("No function_info.json found in the root of the project. Run the init command first.");
  }

}

export default deleteFunction;