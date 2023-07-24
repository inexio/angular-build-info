#! /usr/bin/env node
import signale from "signale";

import { Build } from "./src/interfaces/build.interface";

import version from "./src/modules/version";
import message from "./src/modules/message";
import gitUser from "./src/modules/git/user";
import gitBranch from "./src/modules/git/branch";
import gitCommit from "./src/modules/git/commit";

import args from "./src/lib/arguments";
import write from "./src/lib/write";

(async () => {
    if (args.verbose) signale.debug(args);

    console.log("");
    signale.start("Collection Build Information");

    // Generate `build` object
    const build: Build = {};
    const path = args.path || "src/build.ts" ;
    build.version = await version();
    build.timestamp = new Date().toUTCString();
    build.message =
        args.message || (args.message === "" ? await message() : null);
    build.git = args.noGit
        ? null
        : {
              user: await gitUser(args.verbose),
              branch: await gitBranch(),
              hash: (await gitCommit())?.substr(0, 6),
              fullHash: await gitCommit(),
          };

    // Write Build information to file
    await write(build, path);

    console.log("");
    signale.success("Saved Build Information");

    console.log("");
    signale.info(build);
    console.log("");
})();
