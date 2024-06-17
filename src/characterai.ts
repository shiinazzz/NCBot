// @ts-ignore
import CharacterAI from "node_characterai";

const AI_CLIENT = new CharacterAI();
const SHIROKO_ID = "VAw_2Ov_Dq511JYkwyhKHgboBpr0TxYRcy2UHg9Gt_Q";
let characterChat: any = undefined;

export const connect = async () => {
    await AI_CLIENT.authenticateWithToken(process.env["CHARACTERAI_SESSION_TOKEN"]);
    characterChat = await AI_CLIENT.createOrContinueChat(SHIROKO_ID);
    console.log("Character.AI chat connected.");
}

export const communicate = async (message: string): Promise<string> => {
    if (characterChat == undefined) {
        return "Cannot connect to chat.";
    }

    const response = await characterChat.sendAndAwaitResponse(message, true);
    return response.text;
}

export const promptForDiscord = (author: string, message: string): string => {
    // Yikes, she knows
    return message; //`(OOC: This message was sent by ${author}. Context: Multiple people are using you to chat in a chatroom, just reply like normally.)\n${message}`
}