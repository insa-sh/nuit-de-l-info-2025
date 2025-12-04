const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const { v1: uuidv1 } = require('uuid');

const users = {};
const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

async function identify_user(req, res, next) {
  let session_id = req?.cookies?.session;
  if (!session_id || !users[session_id]) {
    session_id = uuidv1();

    users[session_id] = {
      last_seen: new Date(),
      creation_date: get_date_obj(session_id),
      currency: 0,
      cps: 0,
      multiplier: 1,
      purchases: [],
    };

    res.cookie('session', session_id);
  }

  req.session = users[session_id];
  next();
}

app.get("/click", identify_user, async (req, res) => {
  const gain = 1 * req.session.multiplier;
  req.session.currency += gain;
  res.json({ currency: Math.floor(req.session.currency) });
});

app.get("/balance", identify_user, async (req, res) => {
  const now = Date.now();
  const session = req.session;

  const elapsedSeconds = (now - new Date(session.last_seen).getTime()) / 1000;
  session.currency += session.cps * elapsedSeconds;

  res.json({ currency: Math.floor(req.session.currency) });
  req.session.last_seen = new Date();
});

app.get("/user", identify_user, async (req, res) => {
  const session = req.session;
  res.json({ ...session, currency: Math.floor(session.currency) });
});

app.post("/purchase", identify_user, async (req, res) => {
  const body = req.body;
  if (typeof body !== "object" || typeof body.id !== 'number' || typeof body.cost !== 'number' || typeof body.cps !== 'number' || typeof body.multiplier !== "number") {
    res.status(400).json({ error: "Invalid request input." });
    return;
  }

  req.session.currency -= body.cost;
  req.session.cps += body.cps;
  req.session.multiplier += body.multiplier;

  req.session.purchases.push({
    id: body.id,
    cost: body.cost,
    cps: body.cps,
    multiplier: body.multiplier,
    purchased_on: new Date(),
  });

  res.json(req.session);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

function get_time_int(uuid_str) {
  var uuid_arr = uuid_str.split('-'),
    time_str = [
      uuid_arr[2].substring(1),
      uuid_arr[1],
      uuid_arr[0]
    ].join('');
  return parseInt(time_str, 16);
};

function get_date_obj(uuid_str) {
  var int_time = get_time_int(uuid_str) - 122192928000000000,
    int_millisec = Math.floor(int_time / 10000);
  return new Date(int_millisec);
};

