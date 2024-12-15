import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px;
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
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
`;

const RequestAccess = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [requestCode, setRequestCode] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/requests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      })

      const data = await response.json()

      if (data.success) {
        setRequestCode(data.requestCode)
        setMessage({
          text: 'მოთხოვნა წარმატებით გაიგზავნა! თქვენი კოდია: ' + data.requestCode,
          type: 'success'
        })
        
        // Start polling for status
        startStatusPolling(data.requestCode)
      } else {
        throw new Error(data.error || 'Failed to create request')
      }
    } catch (error) {
      setMessage({
        text: 'მოთხოვნის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const startStatusPolling = (code: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/requests/status/${code}`)
        const data = await response.json()

        if (data.success && data.status === 'approved') {
          clearInterval(pollInterval)
          window.location.href = '/app.tsx'
        }
      } catch (error) {
        console.error('Error polling status:', error)
      }
    }, 5000) // Poll every 5 seconds
  }

  return (
    <Container>
      <Card>
        <Title>მოთხოვნის გაგზავნა</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="სახელი"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="გვარი"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'იგზავნება...' : 'მოთხოვნის გაგზავნა'}
          </Button>
        </Form>
        {message && (
          <Message type={message.type}>
            {message.text}
          </Message>
        )}
      </Card>
    </Container>
  )
}

export default RequestAccess
