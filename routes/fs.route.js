import { Router } from 'express';
import fsController from '../controllers/fs.controller.js';

const fsRouter = Router();

fsRouter.post("/content", fsController.readDirectoryContent);
fsRouter.post("/create", fsController.createNewFolder);
fsRouter.put("/rename", fsController.renameFolderOrFile);
fsRouter.delete("/delete", fsController.deleteFolderOrFile);

export default fsRouter;