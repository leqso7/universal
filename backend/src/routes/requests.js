import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../config/supabase.js'

const router = express.Router()

// Generate a random 5-digit code
const generateRequestCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

// Create new access request
router.post('/create', async (req, res) => {
  try {
    const requestCode = generateRequestCode()
    const userId = uuidv4()

    // Create request in access_requests table
    const { data: accessRequest, error: accessError } = await supabase
      .from('access_requests')
      .insert([
        {
          code: requestCode,
          status: 'pending',
          first_name: req.body.firstName,
          last_name: req.body.lastName
        }
      ])
      .select()

    if (accessError) throw accessError

    // Create request in requests table
    const { data: request, error: requestError } = await supabase
      .from('requests')
      .insert([
        {
          user_id: userId,
          request_code: requestCode,
          status: 'pending'
        }
      ])
      .select()

    if (requestError) throw requestError

    res.json({
      success: true,
      requestCode,
      userId
    })
  } catch (error) {
    console.error('Error creating request:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create request'
    })
  }
})

// Check request status
router.get('/status/:code', async (req, res) => {
  try {
    const { code } = req.params

    const { data, error } = await supabase
      .from('access_requests')
      .select('status')
      .eq('code', code)
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      })
    }

    res.json({
      success: true,
      status: data.status
    })
  } catch (error) {
    console.error('Error checking request status:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to check request status'
    })
  }
})

export default router
