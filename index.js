require("dotenv").config();
var Discord = require("discord.io");
var logger = require("winston");
var fs = require("fs");
const { parse } = require("path");

var regnum = /^\d+$/;
var regnoleadingzeros = /^(0|[1-9][0-9]*)$/;

var bot = new Discord.Client({
  token: process.env.DISCORDBOTTOKEN,
  autorun: true,
});
var prefix = "-";

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";

bot.on("ready", function (evt) {
  logger.info(bot.username + " - (" + bot.id + ")");
  bot.setPresence({
    game: {
      name: "ScholarsMC!",
      type: 3,
    },
  });

  var memberCount = bot.servers["726218800713826394"].member_count;
  logger.info("Member Count: " + memberCount);
});

bot.on("message", function (user, userID, channelID, message, evt) {
  if (userID != "732027107445571624" && evt.d.type == 0) {
    if (message.substring(0, 1) == prefix) {
      var args = message.substring(1).split(" ");
      var cmd = args[0];
      args = args.splice(1);
      var cl = message.substring(1).split("|");
      var cld = cl[0];
      clargs = cl.splice(1);

      var serverID = bot.channels[channelID].guild_id;
      var listOf = bot.servers[serverID].members[userID];

      if (listOf != undefined) {
        var listOfRoles = listOf.roles;
        var isHyper = false;
        var isPresident = listOfRoles.includes("445482959085240331");
        var isEboard = listOfRoles.includes("442756821590081537");
        var isPastEboard = listOfRoles.includes("588114684318580770");

        if (userID == "196685652249673728") {
          isHyper = true;
        }
      }

      switch (cmd) {
        case "purge":
          if (isHyper || isPresident) {
            var bl = [];
            deletemsg(channelID, evt.d.id, 0);
            bot.getMessages(
              {
                channelID: channelID,
                limit: parseInt(args[0]) + 1,
              },
              function (e, a) {
                for (i = 0; i < a.length; i++) {
                  bl.push(a[i].id);
                }
                bot.deleteMessages({
                  channelID: channelID,
                  messageIDs: bl,
                });
              }
            );
          } else {
            deletemsg(channelID, evt.d.id, 0);
            noperm(channelID, evt.d.id);
          }

          break;
        case "bc":
          if (isHyper || isPresident || isEboard) {
            bot.sendMessage({
              to: channelID,
              embed: {
                color: 0x2f190e,
                title: message.substring(4),
                footer: {
                  icon_url:
                    "https://cdn.discordapp.com/avatars/" +
                    userID +
                    "/" +
                    bot.users[userID].avatar,
                  text: "Broadcast issued by " + user,
                },
              },
            });
            deletemsg1(channelID, evt.d.id, 0);
          } else {
            deletemsg(channelID, evt.d.id, 5000);
            noperm(channelID, evt.d.id);
          }

          break;
        case "kill":
          if (isHyper) {
            success(channelID, evt.d.id);
            bot.disconnect();
            process.exit();
          } else {
            noperm(channelID, userID);
          }

          break;
        case "changelog":
          if (isHyper) {
            bot.sendMessage({
              to: channelID,
              message: "",
              embed: {
                color: 0x38A9F7,
                title: clargs[0],
                description: clargs[1],
                //timestamp: new Date(),
                //author: {
                  //name: user,
                //  name: ":wave: Welcome to ScholarsMC!",
                  //icon_url:
                    /*"https://cdn.discordapp.com/avatars/" +
                    userID +
                    "/" +
                    bot.users[userID].avatar,*/
                    //"https://media.discordapp.net/attachments/611791584190791682/720167116741017620/unknown.png",
                //},
                footer: {
                  icon_url:
                    "https://media.discordapp.net/attachments/732083176440332360/732083292228288592/server-logo.png",
                  text: "Server Verification",
                },
                //fields: [
                //  {
                //    //name: clargs[2],
                //    value: clargs[3],
                //    inline: clargs[4],
                //  },
                //  {
                //    //name: clargs[5],
                //    value: clargs[6],
                //    inline: clargs[7],
                //  },
                  //{
                  //  name: "\u200B",
                  //  value: "\u200B",
                  //  inline: true,
                  //},
                  //{
                  //  //name: clargs[8],
                  //  value: clargs[9],
                  //  inline: clargs[10],
                  //},
                  //{
                  //  name: clargs[11],
                  //  value: clargs[12],
                  //  inline: clargs[13],
                  //},
                  //{
                  //  name: clargs[14],
                  //  value: clargs[15],
                  //  inline: clargs[16],
                  //},
                  //{
                  //  name: "\u200B",
                  //  value: "\u200B",
                  //  inline: true,
                  //},
                  //{
                  //  name: clargs[17],
                  //  value: clargs[18],
                  //  inline: clargs[19],
                  //},
                  //{
                  //  name: clargs[20],
                  //  value: clargs[21],
                  //  inline: clargs[22],
                  //},
                  //{
                  //  name: "\u200B",
                  //  value: "\u200B",
                  //  inline: true,
                  //},
                  //{
                  //  name: clargs[23],
                  //  value: clargs[24],
                  //  inline: clargs[25],
                  //},
                  //{
                  //  name: clargs[26],
                  //  value: clargs[27],
                  //  inline: clargs[28],
                  //},
                  //{
                  //  name: "\u200B",
                  //  value: "\u200B",
                  //  inline: true,
                  //},
                  //{
                  //  name: clargs[29],
                  //  value: clargs[30],
                  //  inline: clargs[31],
                  //},
                  //{
                  //  name: clargs[32],
                  //  value: clargs[33],
                  //  inline: clargs[34],
                  //},
                  //{
                  //  name: "\u200B",
                  //  value: "\u200B",
                  //  inline: true,
                  //},
                  //{
                  //  name: clargs[35],
                  //  value: clargs[36],
                  //  inline: clargs[37],
                  //},
                //],
              }, //-changelog |1|2|3|true|5|6|7|true|8|9|true
            });
            deletemsg(channelID, evt.d.id, 0);
          } else {
            deletemsg(channelID, evt.d.id, 5000);
            noperm(channelID, evt.d.id);
          }
          break;
      }
    }
  }
})
// Utilities
function deletemsg(channelID, messageID, length) {
  /*setTimeout(function() {
      bot.deleteMessage({
          channelID: channelID,
          messageID: messageID
      })
  }, length);*/
}

function deletemsg1(channelID, messageID, length) {
  setTimeout(function () {
    bot.deleteMessage({
      channelID: channelID,
      messageID: messageID,
    });
  }, length);
}

function noperm(channelID, id) {
  bot.sendMessage({
    to: channelID,
    embed: {
      color: 0x25a397,
      title: "I'm sorry, but you don't have permission to do that.",
      footer: {
        icon_url:
          "https://media.discordapp.net/attachments/732083176440332360/732083292228288592/server-logo.png",
        text: "Message auto-generated by ScholarsBot.",
      },
    },
  });
  /*setTimeout(function() {
      bot.deleteMessage({
          channelID: channelID,
          messageID: id
      })
  }, 5000);*/
}

function success(channelID, messageID) {
  bot.addReaction({
    channelID: channelID,
    messageID: messageID,
    reaction: ":greenTick:407311488013828119",
  });
}
function failure(channelID, messageID) {
  bot.addReaction({
    channelID: channelID,
    messageID: evt.d.id,
    reaction: ":redTick:407311235822911488",
  });
}
