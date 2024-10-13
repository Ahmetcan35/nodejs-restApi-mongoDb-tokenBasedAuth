const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("config");

const password =config.get("db.password");
const database =config.get("db.name");
const username = config.get("db.username");
module.exports = function(){
mongoose
 .connect(`mongodb+srv://${username}:${password}@ahmetcan.qcymhtx.mongodb.net/${database}?retryWrites=true&w=majority&appName=Ahmetcan`,{  useNewUrlParser: true,
    useUnifiedTopology: true,})
 .then(() => logger.info("MongoDb sunucusuna başarılı bir şekilde bağlandı."))}