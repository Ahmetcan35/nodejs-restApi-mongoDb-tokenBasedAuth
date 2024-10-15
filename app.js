const express = require("express");
const app = express();
require("./startup/logger");
require("./startup/db")();

require("./startup/routes")(app);
if (process.env.NODE_ENV == "production") {
    require("./startup/production");
    
}



app.listen(process.env.PORT || 3000,  () => {
    console.log(`listening on port ${port}`);
})  