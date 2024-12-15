import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import requestRoutes from './routes/requests.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use(express.json())

// Routes
app.use('/api/requests', requestRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
