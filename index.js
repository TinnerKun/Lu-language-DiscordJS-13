const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});
const cooldown = new Set();
const config = {
    token: "TOKEN",
    prefix: "/",
    api_url: "http://lootranslator.infinityfreeapp.com/lootranslator.php"
}
client.on('ready', () => {
    console.log(`ล็อกอินสำเร็จ ${client.user.tag}! GEE`);
});
client.on('messageCreate', async (message) => {
    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd == `${config.prefix}loo`) {
        console.log(cooldown.has(message.guild.id))
        if (cooldown.has(message.guild.id)) {
            message.reply({ embeds: [new MessageEmbed().setAuthor('โปรดลองอีกครั้งใน 5 วินาที').setColor('#ff0000')] }).then(msg => {
                setTimeout(() => msg.delete(), 3000);
            });
            return
        } else {
            cooldown.add(message.guild.id);
            setTimeout(() => {
                cooldown.delete(message.guild.id);
            }, 5000);
        }
        let argall = args.join(" ");
        let check = argall.split(/[A-Z,a-z,0-9]/).join("");

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${config.api_url}?text=${check}&mode=thai2loo&i=1`);
        const res = await page.$eval('body > div', r => r.innerText);
        const embed = new MessageEmbed()
            .setTitle(res)
            .setColor('#00ffff')
            .setFooter('Support By ⵝⵉⵏⵏⴻⵔⴿⵓⵏ');
        message.channel.send({ embeds: [embed] })
        await browser.close()
    }
});
client.login(config.token);
