
const app = require('./app');

const port = process.env.PORT || 3001;

const server = require("http").createServer(app);

app.get('/', function (req, res) {
    res.send("server work");
});



server.listen(port, () => {
    console.log('Running on port...' + port);
});