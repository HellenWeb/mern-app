
// Modules

require('dotenv').config()
const chalk = require('chalk')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const requestLog = require('./routers/request-log')

// Default Variebles

const app = express()
const PORT = process.env.PORT || 5000

// Default Use and Set

app.set('views', path.resolve(__dirname, 'client'))
app.use(cors())
app.use(cookieParser())
app.use(bodyparser.json())
app.use('/api/', requestLog)
app.use(bodyparser.urlencoded({ extended: true }))

// Default Promise with function => "start"

let r = new Promise((resolve, reject) => {
    let start = async () => {
        try {
            await mongoose.connect(process.env.DB_URL, {})
            app.listen(PORT, () => console.log(chalk.yellow(`Server is working on PORT ${PORT}`)));
        } catch (e) {
            console.error(e);
            process.exit(1)
        }
    }
    resolve(start);
})
    .then(data => {
        data()
    })
    .catch(err => {
        console.log(chalk.red(`Error: ${chalk.yellow(err)}`));
    })

// || \\    