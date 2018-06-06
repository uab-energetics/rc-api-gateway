import express from 'express'
import httpProxy from 'express-http-proxy'
import dotenv from 'dotenv'

const cors = require('cors')

/* LOAD ENVIRONMENT VALUES */
dotenv.config({ path: ".env" });

/* BOOTSTRAP THE APPLICATION */
const app = express()
app.set('port', process.env.PORT || 6000)

app.use(cors())

app.post('/auth/login', httpProxy(process.env.RC_AUTHENTICATION_HOST, {
    proxyReqPathResolver: (req) => '/login'
}))

app.post('/auth/register', httpProxy(process.env.RC_AUTHENTICATION_HOST, {
    proxyReqPathResolver: (req) => '/register'
}))

app.get('/auth/github', httpProxy(process.env.RC_AUTHENTICATION_HOST, {
    proxyReqPathResolver: (req) => '/oauth/github'
}))

app.get('/oauth/github/callback', httpProxy(process.env.RC_AUTHENTICATION_HOST))

app.use('/projects/*/pub-repos*', httpProxy(process.env.RC_PUBLICATIONS_HOST, {
    proxyReqPathResolver: req => req.originalUrl
}))

// proxy every request for now. *NOTE - future services will be added here as they are developed.
app.use(httpProxy(process.env.RC_BACKEND_HOST))

export { app }
