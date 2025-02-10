const StatusCheckOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${props => props.isComplete ? 0 : 1};
  pointer-events: ${props => props.isComplete ? 'none' : 'auto'};
  transition: opacity 0.3s ease;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
`; 