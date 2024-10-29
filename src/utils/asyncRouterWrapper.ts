import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "./httpsStatusCodes";
import { TasksLogger } from "../app";

export type ResponseDataType = object | string | number | undefined;
export type ResponseType = {
  data: ResponseDataType;
  status: number;
};

type cbType = (
  req: Request,
  res: Response
) => Promise<ResponseType | ResponseDataType | void | null>;

const DEFAULT_RESPONSE_MESSAGE = "success";
const DEFAULT_RESPONSE_STATUS = HttpStatusCode.OK;

/*
    3 shapes of responses are supported:
      1. ResponseType object
      2. ResponseDataType (status 200 auto assigned)
      3. undifined ({data:"sucess"} & status 200 sent)   
*/
export const asyncRouteWrapper = (cb: cbType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await cb(req, res);
      const data =
        (results as ResponseType)?.data || results || DEFAULT_RESPONSE_MESSAGE;

      const status =
        (results as ResponseType)?.status || DEFAULT_RESPONSE_STATUS;

      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  };
};
