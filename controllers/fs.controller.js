import { readdir } from 'fs/promises';

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

export default {
    readDirectoryContent
};