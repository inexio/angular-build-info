const version = require(`${process.cwd()}/package.json`)?.version;

const getVersion = async (): Promise<string | null> => {
    return version || null;
};

export default getVersion;
