import express from 'express'
import httpProxy from 'express-http-proxy'
import dotenv from 'dotenv'
import url from 'url'

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
    proxyReqPathResolver: req => url.parse(req.originalUrl).path
}))

app.get('/pmc-api', httpProxy(process.env.RC_PUBLICATIONS_HOST))

// proxy every request for now. *NOTE - future services will be added here as they are developed.
app.use(httpProxy(process.env.RC_BACKEND_HOST))

export { app }
