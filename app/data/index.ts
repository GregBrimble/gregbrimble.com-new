import { Env } from "functions/[[path]]";
import { Music } from "./music";
import { Code } from "./code";
import { Newsletter } from "./newsletter";

export const attachClients = (context: EventContext<Env, any, any>) => {
  return {
    clients: {
      music: new Music(context),
      newsletter: new Newsletter(context),
      code: new Code(context),
      // videos: new Videos(env.GREGBRIMBLE_COM_SECRETS),
    },
  };
};
