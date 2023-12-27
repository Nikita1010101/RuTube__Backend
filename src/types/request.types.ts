import { Request } from "express";

import { IUser } from "./user.types";

export type TRequest = Request & { user: IUser }

export interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }
