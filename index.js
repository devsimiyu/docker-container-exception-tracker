const cron = require('node-cron')
const moment = require('moment-timezone')
const readLogs = require('recursive-readdir')
const fs = require('fs')
const { parse } = require('@jsonlines/core')
const jsonParseStream = parse()
const alertMail = require('./mail/alertMail')
const os = require('os')

function filterLogs(file, stats) {
    return stats.isDirectory() ? false : !file.endsWith('-json.log')
}

function errorAlert() {
    readLogs('/var/lib/docker/containers', [filterLogs], (error, files) => {
        if (files) {
            console.log(files)

            for (const file of files) {
                fs.createReadStream(file).pipe(jsonParseStream)

                jsonParseStream.once('data', data => {
                    if (data.log.startsWith('Error') || data.stream == 'stderr') {
                        let timezone = 'Africa/Nairobi'
                        let time = moment(data.time).tz(timezone)
                        let now = moment().tz(timezone)

                        if (now.diff(time, 'minutes') <= 30)
                            alertMail({
                                time: time.format('LL H:m:s'),
                                host: os.hostname(),
                                message: data.log,
                                log: file
                            })
                    }
                })
            }
        }
    })
}

cron.schedule('*/30 * * * *', errorAlert, {
    timezone: 'Africa/Nairobi'
})