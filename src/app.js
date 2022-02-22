const clientId = '944394973325951069';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});
const express = require('express')
const app = express();
const httpApp = express();
require('dotenv').config()


const http = require(`http`).createServer(app);
http.listen(process.env.PORT || 3000 , () => {
    console.log(`: HTTP-Website running on ${process.env.PORT} port.`)
});


DiscordRPC.register(clientId);

async function setActivity() {
    if(!RPC) return;
    RPC.setActivity({
        details: `Check out my discord bot!`,
        state: `Playing Pog Bot`,
        startTimestamp: Date.now(),
        largeImageKey: 'dom_k_v2',
        largeImageText: `Pog Bot`,
        smallImageKey: `dom_k_v2`,
        smallImageText: `Pog Bot`,
        instance: false,
        buttons: [
            {
                label: `Pog Bot`,
                url: `https://pogbotter.herokuapp.com`
            },
            {
                label: `Portfolio Website`,
                url: `https://dom-port.herokuapp.com`,
            },
        ]
    });
}

RPC.on('ready', async() => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15 * 1000)
});

RPC.login({ clientId }).catch(err => console.log(err));