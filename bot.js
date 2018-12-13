const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // معرف فئة التذاكر.
    const categoryId = "498092615351271425";

    // الحصول على اسم المستخدم
    var userName = message.author.username;
    // احصل على التمييز
    var userDiscriminator = message.author.discriminator;

    // إذا تم بالفعل حجز تذكرة
    var bool = false;

    // تحقق مما إذا كانت تذكرة قد تم بالفعل.
    message.guild.channels.forEach((channel) => {

        // إذا تم إجراء التذكرة ، أرسل رسالة.
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("لقد قمت بالفعل بإنشاء تذكرة");

            bool = true;

        }

    });

    // رمز إرجاع تذكرة الس.
    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.author.username)
        .setFooter("يتم إنشاء قناة الدعم");

    message.channel.send(embedCreateTicket);

    // إنشاء قناة ووضعها في الفئة المناسبة.
    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal

        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.

            // وضع تصاريح للجميع
            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
            // تعيين perms للمستخدم الذي قام بإنشاء البطاقة.
            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Hoi, " + message.author.username.toString())
                .setDescription("Zet hier je vraag/bericht");

            settedParent.send(embedParent);

        }).catch(err => {
            message.channel.send("Er is iets fout gelopen.");
        });

    }).catch(err => {
        message.channel.send("Er is iets fout gelopen.");
    });

}

module.exports.help = {
    name: "ticket"
   }
});  

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
