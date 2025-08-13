/**
 * Cyber Bot Forked & Branded by xz Asadul
 * Author: xz Asadul
 * Description: This is your personalized Cyber Bot with full xz Asadul branding
 * Version: 1.0.0
 */

module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity');
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const logger = require("../../utils/log.js");
  const axios = require('axios');
  const moment = require("moment-timezone");

  return async function ({ event }) {
    const dateNow = Date.now();
    const time = moment.tz("Asia/Dhaka").format("HH:MM:ss DD/MM/YYYY");

    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    senderID = String(senderID);
    threadID = String(threadID);

    // -------------------- xz Asadul Branding --------------------
    console.log(`[xz Asadul BOT] Event received in thread ${threadID} from user ${senderID} at ${time}`);
    // -------------------------------------------------------------

    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex(threadSetting.PREFIX || PREFIX)})\\s*`);
    if (!prefixRegex.test(body)) return;

    const [matchedPrefix] = body.match(prefixRegex);
    const args = body.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    let command = commands.get(commandName);

    if (!command) {
      const allCommandName = Array.from(commands.keys());
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.5) command = commands.get(checker.bestMatch.target);
      else return api.sendMessage(`[xz Asadul BOT] Command not found: ${commandName}`, threadID);
    }

    // -------------------- Admin & Permission Checks --------------------
    let permssion = 0;
    const threadInfoo = threadInfo.get(threadID) || await Threads.getInfo(threadID);
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (NDH.includes(senderID)) permssion = 2;
    if (ADMINBOT.includes(senderID)) permssion = 3;
    else if (find) permssion = 1;

    if (command.config.hasPermssion > permssion)
      return api.sendMessage(`[xz Asadul BOT] You do not have permission to use ${command.config.name}`, threadID);

    // -------------------- Cooldown --------------------
    if (!cooldowns.has(command.config.name)) cooldowns.set(command.config.name, new Map());
    const timestamps = cooldowns.get(command.config.name);
    const expirationTime = (command.config.cooldowns || 1) * 1000;
    if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime)
      return api.sendMessage(`[xz Asadul BOT] Wait ${(timestamps.get(senderID) + expirationTime - dateNow)/1000}s to use ${command.config.name} again`, threadID);

    try {
      const Obj = { api, event, args, models, Users, Threads, Currencies, permssion, getText: () => {} };
      await command.run(Obj);
      timestamps.set(senderID, dateNow);

      if (DeveloperMode) {
        console.log(`[xz Asadul BOT] Executed command ${commandName} by ${senderID} in ${threadID}`);
      }

    } catch (e) {
      console.error(`[xz Asadul BOT] Error executing ${commandName}:`, e);
      return api.sendMessage(`[xz Asadul BOT] Command ${commandName} encountered an error: ${e.message}`, threadID);
    }
  };
};
