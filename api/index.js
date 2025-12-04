const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const users = {};
const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

async function identify_user(req, res, next) {
    let session_id = req?.cookies?.session;
    if (!session_id || !users[session_id]) {
        session_id = await createSessionID();

        users[session_id] = {
            last_seen: new Date(),
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
    if (typeof body.id !== 'number' || typeof body.cost !== 'number' || typeof body.cps !== 'number' || typeof body.multiplier !== "number") {
        res.status(400).json({ error: "Invalid request input." });
        return;
    }

    if (req.session.currency < body.cost) {
        res.status(400).json({ error: "Not enough money." });
        return;
    }

    if (req.sessions.purchases.find(p => p.id === body.id)) {
        res.status(400).json({ error: "Item already purchased." });
        return;
    }

    if (req.sessions.purchases.length >= 100) {
        res.status(400).json({ error: "Purchase limit reached." });
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

async function createSessionID() {
    const sessionId = uuidv4();
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(sessionId, salt);

    const id = Buffer.from(hash, 'utf-8').toString('base64');

    return id;
}