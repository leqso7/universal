import { useState } from 'react'
import styled from 'styled-components'

const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1600px;
  margin-top: 60px;
`;

const MainContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 250px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  
  &:hover {
    background: #3367d6;
    transform: translateY(-2px);
  }
`;

const RandomButton = styled(Button)`
  margin: 20px auto;
  display: block;
  background: #9c27b0;
  
  &:hover {
    background: #7b1fa2;
  }
`;

const StudentItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const GroupsContainer = styled.div<{ isOpen: boolean }>`
  width: 800px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
`;

const GroupsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const GroupCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 18px;
  }
  
  p {
    color: #666;
    margin: 5px 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const AddClassModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: ${props => props.isOpen ? '0' : '-400px'};
  top: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Message = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${props => props.isVisible ? 1 : 0});
  background: #4caf50;
  color: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  z-index: 1100;
`;

const NumberButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const NumberButton = styled(Button)<{ active?: boolean }>`
  background: ${props => props.active ? '#4285f4' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.active ? '#3367d6' : '#d5d5d5'};
  }
`;

const StudentList = styled.div`
  overflow-y: auto;
  max-height: 400px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    
    &:hover {
      background: #555;
    }
  }
`;

interface Student {
  name: string;
  timestamp: number;
}

interface Class {
  name: string;
  students: string[];
}

const SearchList = () => {
  const [searchText, setSearchText] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [className, setClassName] = useState('')
  const [studentList, setStudentList] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [selectedGroupCount, setSelectedGroupCount] = useState<number | null>(null)
  const [showGroups, setShowGroups] = useState(false)
  const [groups, setGroups] = useState<Student[][]>([])
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem('classes')
    return saved ? JSON.parse(saved) : []
  })

  const handleAddStudent = () => {
    if (!searchText.trim()) return
    
    const matchingClass = classes.find(c => c.name === searchText)
    if (matchingClass) {
      const newStudents = matchingClass.students.map(name => ({
        name,
        timestamp: Date.now()
      }))
      setStudents(prev => [...newStudents, ...prev])
    } else {
      setStudents(prev => [
        { name: searchText.trim(), timestamp: Date.now() },
        ...prev
      ])
    }
    setSearchText('')
  }

  const handleSaveClass = () => {
    if (!className.trim() || !studentList.trim()) return
    
    const newClass: Class = {
      name: className.trim(),
      students: studentList.split('\n').filter(s => s.trim())
    }
    
    setClasses(prev => {
      const updated = [...prev, newClass]
      localStorage.setItem('classes', JSON.stringify(updated))
      return updated
    })
    
    setClassName('')
    setStudentList('')
    setIsModalOpen(false)
    setMessage('კლასი წარმატებით დაემატა!')
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 6000)
  }

  const selectRandomStudent = () => {
    if (students.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * students.length)
    const student = students[randomIndex]
    
    setMessage(`შერჩეულია: ${student.name}`)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 6000)
  }

  const handleGroupButtonClick = (number: number) => {
    setSelectedGroupCount(number)
    setShowGroups(true)
    const shuffledStudents = [...students]
    for (let i = shuffledStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
    }
    const groups = []
    for (let i = 0; i < shuffledStudents.length; i += number) {
      groups.push(shuffledStudents.slice(i, i + number))
    }
    setGroups(groups)
  }

  return (
    <Container>
      <TopBar>
        <SearchGroup>
          <SearchInput
            type="text"
            placeholder="მოსწავლის სახელი..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={handleAddStudent}>დამატება</Button>
        </SearchGroup>
        <Button onClick={() => setIsModalOpen(true)}>კლასის დამატება</Button>
      </TopBar>

      <ContentWrapper>
        <MainContainer>
          <NumberButtons>
            {[2, 3, 4, 5, 6, 7].map((num) => (
              <NumberButton
                key={num}
                active={selectedGroupCount === num}
                onClick={() => handleGroupButtonClick(num)}
              >
                {num}
              </NumberButton>
            ))}
          </NumberButtons>
          <RandomButton onClick={selectRandomStudent}>
            შემთხვევითი მოსწავლე
          </RandomButton>
          
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student.timestamp}>
                {student.name}
              </StudentItem>
            ))}
          </StudentList>
        </MainContainer>

        <GroupsContainer isOpen={showGroups}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>შექმნილი ჯგუფები</h2>
            <CloseButton onClick={() => setShowGroups(false)}>✕</CloseButton>
          </div>
          <GroupsWrapper>
            {groups.map((group, index) => (
              <GroupCard key={index}>
                <h3>ჯგუფი {index + 1}</h3>
                {group.map((student, studentIndex) => (
                  <p key={studentIndex}>{student.name}</p>
                ))}
              </GroupCard>
            ))}
          </GroupsWrapper>
        </GroupsContainer>
      </ContentWrapper>

      <AddClassModal isOpen={isModalOpen}>
        <h2>კლასის დამატება</h2>
        <SearchInput
          type="text"
          placeholder="კლასის სახელი"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextArea
          placeholder="მოსწავლეების სია (თითო ხაზზე ერთი მოსწავლე)"
          value={studentList}
          onChange={(e) => setStudentList(e.target.value)}
        />
        <Button onClick={handleSaveClass}>შენახვა</Button>
        <Button onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px', background: '#dc3545' }}>
          დახურვა
        </Button>
      </AddClassModal>

      <Message isVisible={showMessage}>
        {message}
      </Message>
    </Container>
  );
};

export default SearchList
