import prompts from "prompts";

/**
 * Open a prompt where the user can enter their own build message
 */
const getMessage = async (): Promise<string | null> => {
    console.log("");
    const { message } = await prompts({
        type: "text",
        name: "message",
        message: "Add build message? (optional)",
    });
    console.log("");

    return message || null;
};

export default getMessage;
