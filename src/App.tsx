import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import RequestAccess from './pages/RequestAccess'
import MainApp from './pages/MainApp'
import InstallPWA from './components/InstallPWA'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

function App() {
  return (
    <BrowserRouter basename="/class-manager">
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<RequestAccess />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <InstallPWA />
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
