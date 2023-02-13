import { readdir, mkdir, rename, rm, unlink } from 'fs/promises';

const readDirectoryContent = async (req, res) => {
    try {
        const { path } = req.body;

        const directoryContent = await readdir((path), { withFileTypes: true });

        const responseData = directoryContent.map(entity => ({
            name: entity.name,
            isDirectory: entity.isDirectory()
        }));

        // Sorting the array of data by type - folders first, files last.
        responseData.sort((a, b) => (a.isDirectory === b.isDirectory) ? 0 : a.isDirectory ? -1 : 1);

        res.json({
            ok: true,
            data: responseData
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: error.message
        });
    }
};

const createNewFolder = async (req, res) => {
    try {
        const { path } = req.body;

        await mkdir(path);

        res.json({
            ok: true
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: error.message
        });
    }
};

const renameFolderOrFile = async (req, res) => {
    try {
        console.log(req.body)
        const { oldPath, newPath } = req.body;
        await rename(oldPath, newPath);

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: error.message
        });
    }
};

const deleteFolderOrFile = async (req, res) => {
    const { entityPath, isDirectory } = req.body;
    try {
        if (isDirectory) {
            await rm(entityPath, { recursive: true, force: true });
        } else {
            await unlink(entityPath);
        }

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: error.message
        });
    }
};

export default {
    readDirectoryContent,
    createNewFolder,
    renameFolderOrFile,
    deleteFolderOrFile
};