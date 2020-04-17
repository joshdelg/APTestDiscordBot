const Discord = require('discord.js');
const moment = require('moment');

const client = new Discord.Client();

const botPrefix = 'apbot!';
const commands = {
  timeUntilCommand: 'timeUntil'
}

const dates = {
  'Physics C: Mechanics': '5/11',
  'Physics C: Electricity and Magnetism': '5/11',
  'Calculus AB': '5/12',
  'Calculus BC': '5/12',
  'Human Geography': '5/12',
  'European History': '5/13',
  'Chemistry': '5/14',
  'Computer Science A': '5/15'
}

function parseClassName(str) {
  let className;
  if(str.includes('calc')) {
    if(str.includes('ab')) {
      className = 'Calculus AB';
    } else if(str.includes('bc')) {
      className = 'Calculus BC';
    }
  } else if(str.includes('human') || str.includes('geo') || str.includes('hug')) {
    className = 'Human Geography';
  } else if(str.includes('euro')) {
    className = 'European History';
  } else if(str.includes('chem')) {
    className = 'Chemistry';
  } else if(str.includes('comp') && str.includes('sci')) {
    if(str.includes('principles')) {
      className = 'Computer Science Principles';
    } else {
      className = 'Computer Science A';
    }
  } else if(str.includes('phys') && str.includes('c')) {
    if(str.includes('mech')) {
      className = 'Physics C: Mechanics';
    } else {
      className = 'Physics C: Electricity and Magnetism';
    }
  } else {
    className = 'Class not found :('
  }
  return className;
}

function getTimeUntil(command) {
  let className = parseClassName(command.toLowerCase());
  const examDate = dates[className];
  const now = moment();
  const examDateMoment = moment(examDate, 'MM-DD');
  const messageToday = "Today is " + now.format('dddd, MMMM, Do, YYYY') + ".\n";
  const messageExamDate = "The AP " + className + " exam will be administered on " + examDateMoment.format('dddd, MMMM, Do, YYYY') + "; ";
  const fromNow = "**" + now.to(examDateMoment) + "**.\n";
  const goodLuck = "Good Luck!  :grin:"

  return messageToday + messageExamDate + fromNow + goodLuck;
}

function parseCommand(command) {
  if(command.includes(commands.timeUntilCommand)) {
    return getTimeUntil(command);
  }
}

// // On bot join
// let defaultChannel = "";
// guild.channels.forEach((channel) => {
//   if(channel.type == "text" && defaultChannel == "") {
//     if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
//       defaultChannel = channel;
//     }
//   }
// })
// //defaultChannel will be the channel object that it first finds the bot has permissions for
// defaultChannel.send(`Hello, I'm AP Countdown Bot, here to bring you to your scheduled days of suffering! :alien:`, {
//   embed:{
//     title: ':x: Prefix',
//     color: 0x2471a3, 
//     description: "The prefix for all my commands is \'apbot!\', e.g: \'apbot! timeUntil\'.",
//     fields:[
//         {
//             name: ':tada: Commands',
//             value: 'Only one command so far :( apbot! timeUntil'
//         },
//         {
//             name: 'apBot! timeUntil <className>',
//             value: 'Tells the date, date of the exam, and time until the exam for that class.'
//         }
//     ],
//     footer: {
//         text: 'Bot in early stages of development...'
//     }
//   }
// });

client.on('ready', () => {
  console.log(`Logged in as  ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.includes(botPrefix)) {
    msg.reply(parseCommand(msg.content));
  }
});

client.login(process.env.BOT_TOKEN);