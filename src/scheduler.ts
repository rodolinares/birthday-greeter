import async from "async";
import moment from "moment";
// import nodeHtmlToImage from "node-html-to-image";
import schedule from "node-schedule";

import { User, UserDocument } from "./models/user.model";

export const scheduler = () => {
  try {
    User.find()
      .then(users => {
        async.each(
          users,
          (user, callback) => {
            const birthday = moment.unix(user.birth_date);
            // const birthday = moment().add(5, "seconds"); // For testing
            const rule = new schedule.RecurrenceRule();
            rule.date = birthday.date();
            rule.month = birthday.month();
            rule.hour = birthday.hour();
            rule.minute = birthday.minute();
            rule.second = birthday.second();

            schedule.scheduleJob(rule, () => {
              sendBirthdayCard(user);
            });

            callback();
          },
          _ => {
            console.log("SCHEDULER: Birthday greetings have been scheduled.");
          }
        );
      })
      .catch(error => {
        console.log(`SCHEDULER: Error loading users. ${error}`);
      });
  } catch (error) {
    console.log(`SCHEDULER: Error loading users. ${error}`);
  }
};

const sendBirthdayCard = (user: UserDocument) => {
  console.log(`SCHEDULER: Happy Birthday, ${user.name}!`);

  // nodeHtmlToImage({
  //   html: `<html><body>Feliz cumpleaños, ${user.name}!</body></html>`,
  //   output: `./${user._id}.png`,
  //   puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  // })
  //   .then(_ => {
  //     console.log(`SCHEDULER: Happy Birthday, ${user.name}!`);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
};

export default scheduler;
