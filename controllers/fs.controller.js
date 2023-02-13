import { readdir, mkdir, rename, rm, unlink } from 'fs/promises';

const readDirectoryContent = async (req, res) => {
    const { path } = req.body;

    try {
        const directoryContent = await readdir((path), { withFileTypes: true });

        const responseData = directoryContent.map(entity => ({
            name: entity.name,
            isDirectory: entity.isDirectory()
        }));

        // Sorting the array of data by type - folders first, files last.
        responseData.sort((a, b) => (a.isDirectory === b.isDirectory) ? 0 : a.isDirectory ? -1 : 1);

        res.status(200).json({
            ok: true,
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const createNewFolder = async (req, res) => {
    const { path } = req.body;

    try {
        await mkdir(path);

        res.status(201).json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

const renameFolderOrFile = async (req, res) => {
    const { oldPath, newPath } = req.body;

    try {
        await rename(oldPath, newPath);

        res.status(200).json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
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

        res.status(500).json({
            ok: true
        });
    } catch (error) {
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