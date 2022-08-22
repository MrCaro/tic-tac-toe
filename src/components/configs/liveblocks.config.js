import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.REACT_APP_API_LIVEBLOCKS,
});

export const { RoomProvider, useOthers, useUpdateMyPresence } = createRoomContext(client);