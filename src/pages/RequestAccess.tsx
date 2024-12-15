import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
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

  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString()
  }

  const handleRequest = () => {
    setLoading(true)
    
    // გენერირებული კოდის ლოკალურ storage-ში შენახვა
    const code = generateCode()
    localStorage.setItem('requestCode', code)
    
    setTimeout(() => {
      setRequestCode(code)
      setLoading(false)
    }, 1000)
  }

  const checkAccess = () => {
    const code = localStorage.getItem('requestCode')
    return code === requestCode
  }

  // თუ კოდი უკვე გენერირებულია, შევამოწმოთ ყოველ 5 წამში
  useEffect(() => {
    if (requestCode) {
      const interval = setInterval(() => {
        if (checkAccess()) {
          window.location.href = '/class-manager/app'
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
