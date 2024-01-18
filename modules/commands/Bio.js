module.exports.config = {
	name: "bio",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
	description: "Change bot's bio",
	commandCategory: "admin",
	usages: "bio [text]",
  cooldowns: 5
  
}
  module.exports.run = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("xảy ra lỗi" + e, event.threadID); return api.sendMessage("Changed bot's Profile Bio to :\n"+args.join(" "), event.threadID, event.messgaeID)
    }
    )
  }