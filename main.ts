import * as dotenv from 'dotenv';
import ScheduleUtils from "./utils/getSchedule";
import SlackBot from "./utils/slackbot";
dotenv.config();

let message: string;
const channelId = process.env.SLACK_CHANNEL_ID; // #pol-who-is-on-call

ScheduleUtils.createMessage().then(r =>{
    message = r
    return SlackBot.postMessage(channelId, message)
})