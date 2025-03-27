import { NextFunction, Request, Response } from "express";

// const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(res.statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "development" ? err.stack : null,
//   });
// };

// export default errorHandler;

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 200;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Hide stack in production
  });
};

export default errorHandler;
