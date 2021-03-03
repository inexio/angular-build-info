import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

import signale from "signale";

const getGitUser = async (verbose?: boolean): Promise<string | null> => {
    // Command to be executed
    const command = "git config user.name";

    // Debug logging
    if (verbose) signale.scope("git user").debug(`Executing \`${command}\``);

    try {
        // Execute Command
        const { stdout, stderr } = await execAsync(command);

        // Catch Errors
        if (stderr) {
            signale
                .scope("git user")
                .warn(`Error fetching git user, command \`${command}\` failed`);
            if (verbose) signale.error(stderr);

            return null;
        }

        if (verbose)
            signale
                .scope("git user")
                .debug(`Found git user \`${stdout.replace("\n", "")}\``);
        return stdout.replace("\n", "") || null;
    } catch (error) {
        signale
            .scope("git user")
            .warn(`Error fetching git user, command \`${command}\` failed`);
        if (verbose) signale.error(error);

        return null;
    }
};

export default getGitUser;
