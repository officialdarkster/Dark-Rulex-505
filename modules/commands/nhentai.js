module.exports.config = {
    name: "nhentai",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
    description: "Search for the information story on nhentai",
    commandCategory: "nsfw",
    usages: "[ID]",
    cooldowns: 5,
    dependencies: {
        "request": "" 
    },
};

module.exports.languages = {

    "en": {
        "genarateCode": "The ideal code for you: %1",
        "notFound": "Can't find your hentai manga!",
        "returnResult": "» Name: %1\n» Author: %2\n» Characters: %3\n» Tags: %4\n» Link: https://nhentai.net/g/%5"
    }
}

module.exports.run = ({ api, event, args, getText }) => {
    const request = global.nodemodule["request"];
    const { threadID, messageID } = event;

    if (!args[0] || typeof parseInt(args[0]) !== "number") return api.sendMessage(getText("genarateCode", Math.floor(Math.random() * 99999)), threadID, messageID);
    return request(`https://nhentai.net/api/gallery/${parseInt(args[0])}`, (error, response, body) => {
        try {
           var codeData = JSON.parse(body);
           if (codeData.error == true) throw new Error();
        }
        catch { return api.sendMessage(getText("notFound"), threadID, messageID) }

        const title = codeData.title.pretty;
        var tagList = [],
            artistList = [],
            characterList = [];
        codeData.tags.forEach(item => (item.type == "tag") ? tagList.push(item.name) : (item.type == "artist") ? artistList.push(item.name) : (item.type == "character") ? characterList.push(item.name) : '');
        var tags = tagList.join(', ');
        var artists = artistList.join(', ');
        var characters = characterList.join(', ');
        if (characters == '') characters = 'Original';
        return api.sendMessage(getText("returnResult", title, artists, characters, tags, args[0]), threadID, messageID);
    });
}