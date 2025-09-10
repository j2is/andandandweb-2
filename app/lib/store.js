import * as queryStore from "@sanity/react-loader";

import { client } from "@/lib/client";
import { token } from "@/lib/token";

queryStore.setServerClient(client.withConfig({ token }));

export const { loadQuery } = queryStore;