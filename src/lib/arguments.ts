import yargs from "yargs";
import signale from "signale";

const args = yargs(process.argv)
    .command(
        "init",
        "Generate a placeholder `build.ts` file",
        () => {},
        () => {
            signale.info("Generating placeholder file");
        }
    )
    .option("verbose", {
        alias: "v",
        type: "boolean",
        description: "Show detailed logs",
    })
    .option("message", {
        alias: "m",
        type: "string",
        description: "Specify a build message",
    })
    .option("path", {
        alias: "p",
        type: "string",
        description: "Path for build.ts",
    })    
    .option("no-git", {
        alias: "g",
        type: "boolean",
        description: "Specify to skip git information",
    })
    .help().argv;

export default args;
