const fs = require("fs");
module.exports.config = {
	name: "bye",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Anup Kumar", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("BYE")==0 || (event.body.indexOf("BY3")==0 || (event.body.indexOf("bye")==0 || (event.body.indexOf("Bye")==0)))) {
		var msg = {
				body: "babye, take your time my honeybunch",
				attachment: fs.createReadStream(__dirname + `/noprefix/bye.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}