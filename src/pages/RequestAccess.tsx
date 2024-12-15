import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  font-size: 16px;
`;

const Code = styled.span`
  font-weight: bold;
  font-size: 32px;
  color: #4285f4;
  display: block;
  margin-top: 15px;
  letter-spacing: 2px;
`;

const RequestAccess = () => {
  const [loading, setLoading] = useState(false)
  const [requestCode, setRequestCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString()
  }

  const handleRequest = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const code = generateCode()
      
      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('access_requests')
        .insert([
          {
            code: code,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])

      if (insertError) throw insertError

      setRequestCode(code)
    } catch (err) {
      console.error('Error:', err)
      setError('მოთხოვნის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.')
    } finally {
      setLoading(false)
    }
  }

  // Check request status every 5 seconds
  useEffect(() => {
    if (requestCode) {
      const interval = setInterval(async () => {
        try {
          const { data, error } = await supabase
            .from('access_requests')
            .select('status')
            .eq('code', requestCode)
            .single()

          if (error) throw error

          if (data?.status === 'approved') {
            clearInterval(interval)
            window.location.href = '/class-manager/app'
          }
        } catch (err) {
          console.error('Error checking status:', err)
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [requestCode])

  return (
    <Container>
      <Card>
        <Title>მოთხოვნის გაგზავნა</Title>
        <Button onClick={handleRequest} disabled={loading || !!requestCode}>
          {loading ? 'იგზავნება...' : 'მოთხოვნის გაგზავნა'}
        </Button>
        {error && (
          <Message type="error">
            {error}
          </Message>
        )}
        {requestCode && (
          <Message type="success">
            მოთხოვნა წარმატებით გაიგზავნა!
            <Code>{requestCode}</Code>
          </Message>
        )}
      </Card>
    </Container>
  )
}

export default RequestAccess
