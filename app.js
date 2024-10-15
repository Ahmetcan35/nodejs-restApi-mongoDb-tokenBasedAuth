const express = require("express");
const app = express();
require("./startup/logger");
require("./startup/routes")(app);
require("./startup/db")();

if (process.env.NODE_ENV == "production") {
    require("./startup/production")(app);
    
}


const port = process.env.PORT || "3000";    

app.listen(process.env.PORT || 3000,  () => {
    console.log(`listening on port ${port}`);
})  