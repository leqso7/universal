import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import requestRoutes from './routes/requests.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

// Security middleware
app.use(helmet())
app.use(limiter)
app.use(express.json())

// Pre-flight requests
app.options('*', cors())

// Routes
app.use('/api/requests', requestRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
