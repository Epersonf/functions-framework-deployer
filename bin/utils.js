
/**
 * @param {import("child_process").ChildProcess} childProcess 
 * @returns {Promise<void>}
 */
function awaitChildProcess(childProcess) {
  return new Promise((resolve, reject) => {
    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

export { awaitChildProcess };