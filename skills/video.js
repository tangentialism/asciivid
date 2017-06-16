var chrono = require('../lib/chrono');
var moment = require('moment');
var Meeting = require('../lib/Meeting');
var loadMeetingById = require('../lib/load_meeting_by_id');
var clearAction = require('../lib/clear_action');
var startMeeting = require('../lib/start_meeting');

module.exports = function(controller) {
    controller.on('interactive_message_callback', function(bot, trigger) {
        var meeting_id = trigger.actions[0].value;
        controller.trigger(trigger.actions[0].name, [bot, trigger, meeting_id]);
        return false; // do not bubble event
    });


  controller.hears(['hey now'], 'direct_message,direct_mention', function(bot, message) {
    var allStar = require('../lib/smashmouth_all_star').slice(0);
    bot.replyAndUpdate(message, allStar.shift(), function(err, src, updateResponse) {
        if (err) console.error(err);

        var sing = function() {
            if (allStar.length > 0) {
                updateResponse(allStar.shift(), function(err) {
                  console.error(err)
                });
            } else {
                clearInterval(ci);
            }
        }

        var ci = setInterval(sing, 1500);

    });
  });
}
