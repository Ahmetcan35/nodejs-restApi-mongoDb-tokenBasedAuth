const {transports, createLogger, format} = require("winston");
const { combine, timestamp, prettyPrint} = format ;
const config = require("config");
require("winston-mongodb");
const username = config.get("db.username");
const password =config.get("db.password");
const database =config.get("db.name");
const logger = createLogger({
    level:"debug",
    format: combine(
        timestamp({
            format:"MMM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint()
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:"logs/logs.log", level:"error",maxFiles:"3d"}),
        new transports.File({filename:"logs/exception.log", level:"error",maxFiles:"3d",handleExceptions:true,handleRejections:true}),
        new transports.MongoDB({
            level:"error",
            db:`mongodb+srv://${username}:${password}@ahmetcan.qcymhtx.mongodb.net/${database}?retryWrites=true&w=majority&appName=Ahmetcan`,
            collection:"server_logs"
        })
    ],
});
    // process.on("uncaughtException", (err)=>{
    //     console.log(err.message);
    //     logger.error(err.message);
    // });
    // process.on("unhandledRejection", (err)=>{
    //     console.log(err.message);
    //     logger.error(err.message);
    // });
module.exports=logger;