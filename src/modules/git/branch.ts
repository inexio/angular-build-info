import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

import signale from "signale";

const getGitBranch = async (verbose?: boolean): Promise<string | null> => {
    // Command to be executed
    const command = "git rev-parse --abbrev-ref HEAD";

    // Debug logging
    if (verbose) signale.scope("git branch").debug(`Executing \`${command}\``);

    // Execute Command
    try {
        const { stdout, stderr } = await execAsync(command);

        // Catch Errors
        if (stderr) {
            signale
                .scope("git branch")
                .warn(
                    `Error fetching git branch, command \`${command}\` failed`
                );
            if (verbose) signale.error(stderr);

            return null;
        }

        if (verbose)
            signale
                .scope("git branch")
                .debug(`Found git branch \`${stdout.replace("\n", "")}\``);
        return stdout.replace("\n", "") || null;
    } catch (error) {
        signale
            .scope("git branch")
            .warn(`Error fetching git branch, command \`${command}\` failed`);
        if (verbose) signale.error(error);

        return null;
    }
};

export default getGitBranch;
