export interface Build {
    /**
     * Build version, retrieved from `package.json`
     */
    version?: string | null;

    /**
     * Timestamp when the application was built
     */
    timestamp?: string | null;

    /**
     * Custom build message, can be set with `--message <message>`/`-m <message>`.
     * If no message is provided, the user will be prompted in the terminal
     */
    message?: string | null;

    /**
     * Combined git information, can be disabled with the `--no-git` flag
     */
    git?: {
        /**
         * Username of the Git User
         */
        user?: string | null;

        /**
         * Current branch name
         */
        branch?: string | null;

        /**
         * Shortened hash of the latest commit
         */
        hash?: string | null;

        /**
         * Full length hash of the latest commit
         */
        fullHash?: string | null;
    } | null;
}
