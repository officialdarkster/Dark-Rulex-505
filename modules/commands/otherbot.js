module.exports.config = {
	name: "otherbot",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
	description: "add other bots uid",
	commandCategory: "config",
	usages: "[userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.run = async function ({ api, event, args, Users, permssion }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { OTHERBOT } = global.config;
    const { userName } = global.data;
  const { writeFileSync } = global.nodemodule["fs-extra"];
const mention = Object.keys(mentions);
  const permission = ["100009259885163"];
             if (!permission.includes(event.senderID)) return api.sendMessage("You don't have permission for this command", threadID, messageID);

if(!mention) return api.sendMessage("Please mention a user.", threadID, messageID);


if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    OTHERBOT.push(id);
                    config.OTHERBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(`[ OK ] Added ${mention.length} UID to the OTHER BOT Config\n\n${listAdd.join("\n").replace(/\@/g, "")}`, threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                OTHERBOT.push(content[0]);
                config.OTHERBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(`[ OK ] Successfully added [ ${content[1]} ] » ${name}`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
      