import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

import signale from "signale";

const getGitCommitHash = async (verbose?: boolean): Promise<string | null> => {
    // Command to be executed
    const command = "git rev-parse HEAD";

    // Debug logging
    if (verbose) signale.scope("git commit").debug(`Executing \`${command}\``);

    // Execute Command
    try {
        // Execute Command
        const { stdout, stderr } = await execAsync(command);

        // Catch Errors
        if (stderr) {
            signale
                .scope("git commit")
                .warn(
                    `Error fetching latest commit, command \`${command}\` failed`
                );
            if (verbose) signale.error(stderr);

            return null;
        }

        if (verbose)
            signale
                .scope("git commit")
                .debug(`Found latest commit \`${stdout.replace("\n", "")}\``);
        return stdout.replace("\n", "") || null;
    } catch (error) {
        signale
            .scope("git commit")
            .warn(
                `Error fetching latest commit, command \`${command}\` failed`
            );
        if (verbose) signale.error(error);

        return null;
    }
};

export default getGitCommitHash;
