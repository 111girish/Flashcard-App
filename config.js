import { config } from "dotenv";
config({path: './.env'});

const envVars = {
  port: process.env.PORT || 3000,
  frontEndUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV,
  dbConnect: process.env.DB_CONNECT,
  accessToken: process.env.ACCESS_TOKEN
}

function getEnv(varName) {
  if (envVars[varName] === 'undefined'){
    console.log(`${varName} is not available`);
    process.exit(1);
  } else {
    return envVars[varName];
  }
}

export default getEnv;


