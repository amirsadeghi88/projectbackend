import { Request, Response, Application } from "express";

module.exports = (app: Application) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message:
        "This route does not exist, you should probably look at your URL or what your backend is expecting",
    });
  });

  app.use((err: Error, req: Request, res: Response) => {
    console.error("ERROR", req.method, req.path, err);
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
