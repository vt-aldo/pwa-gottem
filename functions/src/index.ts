import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { sample } from 'lodash';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();

const vapidKeys = {
  "publicKey": "BC8iHicSX9qdAZkS1DB1iNhRwVbD8YSq_lvbn8r3flIvnI6c2q8gpUZOpn2i7WgBgv-qzeHIUf1jzX9AxH4flkM",
  "privateKey": "WpRTyy6_NbNJXj2cKRjXXyM51-XyMNY9PRMht1Zb5LM"
};

const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:mrawesomer34@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(cors({ origin: true }));

const news = [
  {
    title: "This cat is so sad",
    blurb: "Alexa play Despacito",
    image: "https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg"
  },
  {
    title: "Butter makes cats sad",
    blurb: "Please say no to lipids",
    image: "https://i.kym-cdn.com/photos/images/newsfeed/001/384/535/295.jpg"
  },
  {
    title: "Sleep is the only respite",
    blurb: "Better enjoy it while you can",
    image: "https://imgur.com/zygRxDV.png"
  }
];

const fakeDb = [];

app.get('/news', (req, res) => {
  res.send(sample(news));
});

app.post('/subscribe', (req, res) => {
  fakeDb.push(req.body);
  res.status(200).send(fakeDb);
});

app.post('/gottem', (req, res) => {
  const sentData = {
    message: 'HA! GOTTEM!',
  };

  const notifPayload = {
    "notification": {
      "title": "Hello there",
      "body": "You have won 100BTC!",
      "icon": "assets/images/gold-bitcoin-icon-0.png",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "get!",
        "title": "Claim your prize!"
      }]
    }
  };

  const promises = [];
  fakeDb.forEach(subscription => {
    console.log('subscription:');
    console.log(subscription);
    promises.push(webpush.sendNotification(subscription, JSON.stringify(notifPayload)));
  });
  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Sent!' }))
    .catch(err => res.status(400).json({
      message: 'Something went wrong: ' + err
    }));
});

exports.endpoints = functions.https.onRequest(app);
