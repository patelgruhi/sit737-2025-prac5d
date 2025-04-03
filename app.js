const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 4000;

// Logger setup
const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calc-service' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ],
});

app.use((req, res, next) => {
    log.info(`Request: ${req.method} ${req.url} from ${req.ip}`);
    next();
});

// Input validation function
const checkInputs = (a, b = null) => {
    if (isNaN(a) || (b !== null && isNaN(b))) {
        throw new Error('Invalid input: Parameters must be numbers');
    }
};

// Arithmetic operations
app.get('/add', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        const sum = a + b;
        log.info(`Addition: ${a} + ${b} = ${sum}`);
        res.json({ sum });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get('/subtract', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        const difference = a - b;
        log.info(`Subtraction: ${a} - ${b} = ${difference}`);
        res.json({ difference });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get('/multiply', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        const product = a * b;
        log.info(`Multiplication: ${a} * ${b} = ${product}`);
        res.json({ product });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get('/divide', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        if (b === 0) throw new Error('Cannot divide by zero');
        const quotient = a / b;
        log.info(`Division: ${a} / ${b} = ${quotient}`);
        res.json({ quotient });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});


app.get('/power', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        const result = Math.pow(a, b);
        log.info(`Exponentiation: ${a} ^ ${b} = ${result}`);
        res.json({ result });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get('/sqrt', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        if (a < 0 || b < 0) throw new Error('Cannot find square root of a negative number');
        const resultA = Math.sqrt(a);
        const resultB = Math.sqrt(b);
        log.info(`Square Root: √${a} = ${resultA}, √${b} = ${resultB}`);
        res.json({ resultA, resultB });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get('/modulo', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        checkInputs(a, b);
        if (b === 0) throw new Error('Cannot divide by zero');
        const result = a % b;
        log.info(`Modulo: ${a} % ${b} = ${result}`);
        res.json({ result });
    } catch (err) {
        log.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    log.info(`Service running on port ${PORT}`);
    console.log(`Server live at http://localhost:${PORT}`);
});
