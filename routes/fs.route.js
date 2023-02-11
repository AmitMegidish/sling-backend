import { Router } from 'express';
import fsController from '../controllers/fs.controller.js';

const fsRouter = Router();

// fsRouter.route("/:path")
//     .get(fsController.readDirectoryContent);

fsRouter.post("/content", fsController.readDirectoryContent);
fsRouter.post("/create", fsController.createNewFolder);
fsRouter.put("/rename", fsController.renameFolderOrFile)

export default fsRouter;