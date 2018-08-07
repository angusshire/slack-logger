import * as Bunyan from "bunyan";
import slackLog from "./services/slackLog";

// notify of missing configuration
if (!slackLog.isEnabled) {
  console.log(
    "no valid configuration exists, please copy .env-example file to .env and modify it's contents to match your Slack integration options",
  );

  process.exit(1);
}

// create bunyan logger
const logger = Bunyan.createLogger({
  name: "server",
  streams: [],
});

// add the slack log as raw stream
logger.addStream({
  name: "slack",
  level: "info",
  type: "raw",
  stream: slackLog,
});

// log an error
logger.error(
  {
    userData: {
      success: false,
      info: {
        firstName: "Jack",
        lastName: "Daniels",
        email: "jack@daniels.com",
      },
    },
    error: new Error("Duplicate email: jack@daniels.com"),
  },
  "registering user failed",
);