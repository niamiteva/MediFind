const {app} = require('./base');

// Server port
const HTTP_PORT = 3000;
// Start server
app.listen(HTTP_PORT, (err) => {
    if(err) console.log(err);

    console.info("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});