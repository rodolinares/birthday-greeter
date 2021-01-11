import errorHandler from "errorhandler";

import app from "./app";
import scheduler from "./scheduler";

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
  console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

scheduler();

export default server;
