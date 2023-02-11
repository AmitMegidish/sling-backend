import { Router } from 'express';
import fsController from '../controllers/fs.controller.js';

const fsRouter = Router();

// fsRouter.route("/:path")
//     .get(fsController.readDirectoryContent);

fsRouter.post("/content", fsController.readDirectoryContent);

export default fsRouter;