import axios from "axios";

export default class ScheduleUtils {

    static async getScheduleId(workstream: string) {
        if(workstream === "cards"){
            return process.env.CARDS_SCHEDULE_ID
        } else if (workstream === "bacs"){
            return process.env.BACS_SCHEDULE_ID
        } else if (workstream === "inbound"){
            return process.env.INBOUND_SCHEDULE_ID
        } else throw Error("No valid workstream selected - must be one of ['bacs', 'cards', 'inbound']!")
    }

    static async whoIsOnCall(workstream: string) {
        let scheduleId
        await this.getScheduleId(workstream).then(response => {
                scheduleId = response
        })
        return await axios.get(`https://api.opsgenie.com/v2/schedules/${scheduleId}/on-calls`, {
            headers: {
                'Authorization': `GenieKey ${process.env.OPSGENIE_API_KEY}`
            }
        }).then(response => {
            const engineerOnCall = response.data.data.onCallParticipants[0].name.toString()
            return `The person on call today for ${workstream} is ${engineerOnCall}\n`
        })
    }

    static async createMessage(){
        const workstreams = ["bacs", "cards", "inbound"]
        let message = "Hello!\n"
        for (const workstream of workstreams) {
            await ScheduleUtils.whoIsOnCall(workstream).then(r => {
                message = message + r;

            });
        }
        return message
    }

}



