import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
`;

const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const AddClassButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const MainContainer = styled.div<{ isGroupsOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isGroupsOpen ? 'space-between' : 'center'};
  gap: 20px;
  padding: 20px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  margin-top: 80px;
`;

const ListContainer = styled.div`
  width: ${props => props.isGroupsOpen ? '45%' : '500px'};
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  position: relative;

  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const GroupsContainer = styled.div<{ isOpen: boolean }>`
  width: 45%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(50px)'};
  transition: all 0.3s ease-in-out;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  position: relative;

  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
  z-index: 2;
  
  &:hover {
    color: #333;
  }
`;

const StudentList = styled.div`
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ButtonContainer = styled.div`
  padding: 20px 0;
  border-top: 1px solid #eee;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 100%;
`;

const NumberButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const NumberButton = styled(Button)<{ active?: boolean }>`
  background: ${props => props.active ? '#4285f4' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.active ? '#3367d6' : '#d5d5d5'};
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
  background: white;
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const GroupsWrapper = styled.div<{ isExpanded?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.isExpanded 
    ? 'repeat(auto-fit, minmax(300px, 1fr))' 
    : 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${props => props.isExpanded ? '20px' : '15px'};
  padding: ${props => props.isExpanded ? '40px 20px' : '10px'};
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-top: ${props => props.isExpanded ? '40px' : '0'};
`;

const GroupCard = styled.div<{ isExpanded?: boolean }>`
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: ${props => props.isExpanded ? '1.2em' : '1em'};
  height: fit-content;

  h3 {
    margin: 0 0 10px 0;
    font-size: ${props => props.isExpanded ? '1.5em' : '1.2em'};
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

interface Student {
  name: string;
  timestamp: number;
}

interface Class {
  name: string;
  students: string[];
}

const SearchList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [studentList, setStudentList] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [selectedGroupCount, setSelectedGroupCount] = useState<number | null>(null);
  const [showGroups, setShowGroups] = useState(false);
  const [groups, setGroups] = useState<Student[][]>([]);
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem('classes');
    return saved ? JSON.parse(saved) : [];
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddStudent = () => {
    if (!searchText.trim()) return;
    
    const matchingClass = classes.find(c => c.name === searchText);
    if (matchingClass) {
      const newStudents = matchingClass.students.map(name => ({
        name,
        timestamp: Date.now()
      }));
      setStudents(prev => [...newStudents, ...prev]);
    } else {
      setStudents(prev => [
        { name: searchText.trim(), timestamp: Date.now() },
        ...prev
      ]);
    }
    setSearchText('');
  };

  const handleSaveClass = () => {
    if (!className.trim() || !studentList.trim()) return;
    
    const newClass: Class = {
      name: className.trim(),
      students: studentList.split('\n').filter(s => s.trim())
    };
    
    setClasses(prev => {
      const updated = [...prev, newClass];
      localStorage.setItem('classes', JSON.stringify(updated));
      return updated;
    });
    
    setClassName('');
    setStudentList('');
    setIsModalOpen(false);
    setMessage('კლასი წარმატებით დაემატა!');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 6000);
  };

  const selectRandomStudent = () => {
    if (students.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * students.length);
    const student = students[randomIndex];
    
    setMessage(`შერჩეულია: ${student.name}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 6000);
  };

  const handleGroupButtonClick = (number: number) => {
    setSelectedGroupCount(number);
    setShowGroups(true);
    const shuffledStudents = [...students];
    for (let i = shuffledStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
    }
    const groups = [];
    for (let i = 0; i < shuffledStudents.length; i += number) {
      groups.push(shuffledStudents.slice(i, i + number));
    }
    setGroups(groups);
  };

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
        <AddClassButton onClick={() => setIsModalOpen(true)}>კლასის დამატება</AddClassButton>
      </TopBar>

      <MainContainer isGroupsOpen={showGroups}>
        <ListContainer isGroupsOpen={showGroups}>
          <h2>მოსწავლეები</h2>
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student.timestamp}>
                {student.name}
              </StudentItem>
            ))}
          </StudentList>
          <ButtonContainer>
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
          </ButtonContainer>
        </ListContainer>
        {showGroups && (
          <GroupsContainer isOpen={showGroups}>
            <h2>შექმნილი ჯგუფები</h2>
            <CloseButton onClick={() => setShowGroups(false)}>✕</CloseButton>
            <GroupsWrapper>
              {groups.map((group, index) => (
                <GroupCard key={index}>
                  <h3>ჯგუფი {index + 1}</h3>
                  {group.map((student, studentIndex) => (
                    <div key={studentIndex}>{student.name}</div>
                  ))}
                </GroupCard>
              ))}
            </GroupsWrapper>
          </GroupsContainer>
        )}
      </MainContainer>

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

export default SearchList;
