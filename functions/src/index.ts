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
    image: "https://imgur.com/zygRxDV"
  }
];

app.get('/news', (req, res) => {
  res.send(sample(news));
});

app.post('/gottem', (req, res) => {
  // Push notif logic here
});

exports.endpoints = functions.https.onRequest(app);
