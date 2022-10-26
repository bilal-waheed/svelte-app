import { UserSession, AppConfig } from "@stacks/connect";
import { Storage } from "@stacks/storage";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export const storage = new Storage({ userSession });
