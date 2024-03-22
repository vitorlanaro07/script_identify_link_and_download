const fs = require("node:fs");
const ytdl = require('ytdl-core');
const path = require("path")


fs.readFile(path.resolve(__dirname, "_chat.txt"), 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    }

    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(pattern);
    const links = data.match(regex);

    
    links.forEach(link => {
        if(!link.match('playlist')){
            title = "";
            ytdl.getInfo(link).then((info) => {
                title = info.videoDetails.title;
                for (let i = 0; i < title.length; i++){
                    title = title.replace("/", "-");
                }
                console.log(title);  
                ytdl(link, {filter: 'audioonly', quality:'highestaudio'}).pipe(fs.createWriteStream(`${title}.mp3`));
            })
        }
    })
})
