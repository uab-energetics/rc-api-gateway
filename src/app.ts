import express from 'express'
import httpProxy from 'express-http-proxy'
import dotenv from 'dotenv'

/* LOAD ENVIRONMENT VALUES */
dotenv.config({ path: ".env" });

/* BOOTSTRAP THE APPLICATION */
const app = express()
app.set('port', process.env.PORT || 6000)

// proxy every request for now. *NOTE - future services will be added here as they are developed.
app.use((req, res, next) => {
    httpProxy(process.env.HOST_RC_BACKEND)(req, res, next)
})

export { app }
