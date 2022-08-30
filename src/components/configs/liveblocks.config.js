import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.REACT_APP_LIVEBLOCKS_SECRET_KEY,
});

export const { RoomProvider, useOthers, useMyPresence } = createRoomContext(client);