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

client.on('ready', () => {
  console.log(`Logged in as  ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.includes(botPrefix)) {
    msg.reply(parseCommand(msg.content));
  }
});

client.login(process.env.BOT_TOKEN);