const { Client, MessageEmbed }= require('discord.js');
const puppeteer = require('puppeteer');
const client = new Client();

const config = {
  token: "",
  prefix: "/",
  api_url: "http://lootranslator.infinityfreeapp.com/lootranslator.php"
}

client.on('ready', () => {
    console.log(`ล็อกอินสำเร็จ ${client.user.tag}! GEE`);
  });

client.on('message', async (msg) => {
    const args = msg.content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd == `${config.prefix}loo`) {
        
        let argall = args.join(" ");
        let check  = argall.split(/[A-Z,a-z,0-9]/).join("");

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${config.api_url}?text=${check}&mode=thai2loo&i=1`);
      const res = await page.$eval('body > div', r => r.innerText);
      const embed = new MessageEmbed()
        .setTitle('Loo Translator')
        .setColor('#00fff')
        .setDescription(`\`${res}\``)
        .setFooter('Support By ⵝⵉⵏⵏⴻⵔⴿⵓⵏ');
      msg.channel.send(embed)
      await browser.close()
    }
});

client.login(config.token);
