// -------------------------------
// Logger colorido com controle de ambiente
// -------------------------------

const isDev = process.env.NODE_ENV !== "production"; 

export const logger = {
  logInfo: (message) => {
    if (isDev) console.log(`\x1b[36m🔵 INFO:\x1b[0m ${message}`);
  },
  logWarn: (message) => {
    if (isDev) console.log(`\x1b[33m🟠 WARN:\x1b[0m ${message}`);
  },
  logError: (message) => {
    console.log(`\x1b[31m🔴 ERROR:\x1b[0m ${message}`);
  },
  logSuccess: (message) => {
    console.log(`\x1b[32m🟢 SUCESSO:\x1b[0m ${message}`);
  },
  //  método apenas para depuração interna
  debug: (message) => {
    if (isDev && process.env.SHOW_DEBUG === "true") {
      console.log(`\x1b[90m⚙ DEBUG:\x1b[0m ${message}`);
    }
  },
};
