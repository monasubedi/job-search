import { db } from "./db";

export const handlers = [...db.user.toHandlers("rest")];
