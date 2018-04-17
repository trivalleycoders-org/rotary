import * as winston from 'winston'
import * as rotate from 'winston-daily-rotate-file'
import config from '../config'
import * as fs from 'fs'
require('dotenv').config()

const dir = process.env.LOG_FILE_DIR

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}


let logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
        }),
        new winston.transports.DailyRotateFile({
            filename: process.env.LOG_FILE_NAME,
            dirname: dir,
            maxsize: 20971520, //20MB
            maxFiles: 25,
            datePattern: '.dd-MM-yyyy'
        })
    ]
})

export default logger
