import axios from "axios";

export default class SlackBot {

    static async postMessage(channel: any, message: string) {
        const headers = {
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
            "Content-type": "application/json",
        };

        const data = {
            channel,
            text: message,
        };

        try {
            return axios({
                method: "post",
                url: "https://slack.com/api/chat.postMessage",
                headers,
                data,
            });
        } catch (err) {
            console.log(err);
        }
    }

}
