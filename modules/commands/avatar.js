module.exports.config = {
    name: "avatar",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
    description: "",
    commandCategory: "image",
    usages: "{p}{n} <character code or character name> | <background letters> | <signature> | <English color name or background color code (hex color)>\n{p}{n} ",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, download }) {

    const fs = require("fs-extra");
    const axios = require("axios");
    if (!args[0]) {api.sendMessage(`Please enter something or use "${global.config.PREFIX}help avatar" for more info`,event.threadID, event.messageID);}
    else {
		  api.sendMessage(`Image initialization, please wait...`,event.threadID, event.messageID)
		  const content = args.join(" ").split("|").map(item => item = item.trim());
		  let idNhanVat, tenNhanvat;
		  const chunn = content[1];
      const chuky  = content[2];
      const colorBg = content[3];
      try {
  		  const dataChracter = (await axios.get("https://manhict.tech/api/listAvt")).data.result;
        if (!isNaN(content[0])) {
          idNhanVat = parseInt(content[0]);
          const totalCharacter = dataChracter.length - 1;
          if (idNhanVat > totalCharacter) return api.sendMessage(`Currently only ${totalCharacter} character on the system, please enter a smaller character id`, event.threadID, event.messageID);
          tenNhanvat = dataChracter[idNhanVat].name;
        }
        else {
          findChracter = dataChracter.find(item => item.name.toLowerCase() == content[0].toLowerCase());
          if (findChracter) {
            idNhanVat = findChracter.stt;
            tenNhanvat = content[0];
          }
          else return api.sendMessage("The character named could not be found " + content[0] + " in the character list", event.threadID, event.messageID);
        }
      }
      catch(error) {
        const err = error.response.data;
        return api.sendMessage(`An error occurred getting character data:\n${err.name}: ${err.message}`, event.threadID, event.messageID);
      }
      
      const endpoint = `https://manhict.tech/api/avtWibu?`;
      const params = {
        id: idNhanVat,
        chuen,
        chuky,
        apikey: "tsfP6KbU"
      };
      if (colorBg) params.colorBg = colorBg;
      
      try {
        const response = await axios.get(endpoint, {
          params,
          responseType: "stream"
        });
        api.sendMessage({
          body: `✅ Your avatar\nCharacter: ${tenNhanvat}\nCode: ${idNhanVat}\nText background: ${chunen}\nSignature: ${chuky}\nColor: ${colorBg || "default"}`, 
          attachment: response.data
     },event.threadID, event.messageID);
  		}
  		catch(error) {
  		  error.response.data.on("data", function(e) {
          const err = JSON.parse(e);
          api.sendMessage(`Error! An error occurred. Please try again late`,event.threadID, event.messageID);
        });
		  }
	  }
  }


