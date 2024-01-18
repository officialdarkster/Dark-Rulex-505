module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "Anup Kumar",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinGif");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `───── ❝✰BOT✰❞ ─────\n\n${global.config.BOTNAME} Connected 🌐✅
        
𝐇𝐞𝐥𝐥𝐨𝐰 𝐌𝐲 𝐍𝐚𝐦𝐞 𝐢𝐬 ${global.config.BOTNAME}
𝐌𝐲 𝐏𝐫𝐞𝐟𝐢𝐱 𝐢𝐬 [ ${global.config.PREFIX} ]
𝐓𝐲𝐩𝐞 ${global.config.PREFIX}𝐡𝐞𝐥𝐩 𝐭𝐨 𝐬𝐞𝐞 𝐦𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐥𝐢𝐬𝐭.
𝐌𝐲 𝐁𝐨𝐬𝐬 𝐍𝐚𝐦𝐞 𝐢𝐬 𝐀𝐧𝐮𝐩 𝐊𝐮𝐦𝐚𝐫 💖 💫𝐊𝐢𝐧𝐝𝐥𝐲 𝐔𝐬𝐞 ${global.config.PREFIX}𝐜𝐚𝐥𝐥𝐚𝐝 𝐅𝐨𝐫 𝐚𝐧𝐲 𝐢𝐬𝐬𝐮𝐞𝐬 𝐎𝐫 𝐂𝐨𝐧𝐜𝐞𝐫𝐧𝐬💫
𝐓𝐡𝐚𝐧𝐤 𝐘𝐨𝐮, 𝐇𝐚𝐯𝐞 𝐀 𝐍𝐢𝐜𝐞 𝐃𝐚𝐲 ☀️ \n≿━━━━━━༺❀༻━━━━━━≾\n⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\n┗━━━━━━━ ☆ ━━━━━━━┛
`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello.gif")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "♜Hellow♜ ➡️ {name}, You're The {soThanhVien} Member of {threadName} <3\n\nEnjoy Your Stay And Make Lots Of Friends 💛" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}
