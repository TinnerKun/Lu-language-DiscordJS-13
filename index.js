const puppeteer = require('puppeteer');
const Discord = require("discord.js"); // npm i discord.js@12.5.3
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`ล็อกอินสำเร็จ ${client.user.tag}! GEE`);
  });

client.on('message', message => {
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

if(command == "/loo") {
    (async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('http://lootranslator.infinityfreeapp.com/lootranslator.php?text='+args[0]+'&mode=thai2loo&i=1')
      const spanVal =  await page.$eval('body > div', el => el.innerText);
      const embed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(spanVal)
        .setFooter('Support By ⵝⵉⵏⵏⴻⵔⴿⵓⵏ');
        message.channel.send(embed);
      
      await browser.close()
    })()
  }
});
client.login("");
