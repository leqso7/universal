import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface Student {
  name: string;
  timestamp: number;
}

interface Class {
  name: string;
  students: Student[];
}

interface SearchListProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const SearchList: React.FC<SearchListProps> = ({ students, setStudents }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showGroups, setShowGroups] = useState(false);
  const [groups, setGroups] = useState<Student[][]>([]);
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem('classes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, students]);

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  const handleSaveClass = () => {
    if (!className.trim() || selectedStudents.length === 0) return;

    const newClass: Class = {
      name: className.trim(),
      students: selectedStudents
    };

    setClasses(prev => [...prev, newClass]);
    setClassName('');
    setSelectedStudents([]);
    setIsModalOpen(false);
    setMessage('კლასი წარმატებით შეინახა!');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const selectRandomStudent = () => {
    if (students.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * students.length);
    const student = students[randomIndex];
    
    setMessage(`მოსწავლე: ${student.name}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 6000);
  };

  const handleGroupButtonClick = (number: number) => {
    if (students.length === 0) return;

    const shuffledStudents = [...students];
    for (let i = shuffledStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
    }

    const newGroups: Student[][] = [];
    for (let i = 0; i < shuffledStudents.length; i += number) {
      newGroups.push(shuffledStudents.slice(i, i + number));
    }
    
    setGroups(newGroups);
    setShowGroups(true);
  };

  const handleAddStudent = () => {
    if (!searchText.trim()) return;

    const studentName = searchText.trim();
    const isDuplicate = students.some(
      student => student.name.toLowerCase() === studentName.toLowerCase()
    );

    if (isDuplicate) {
      setMessage('მოსწავლე უკვე არსებობს!');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    const newStudent = {
      name: studentName,
      timestamp: Date.now(),
    };

    setStudents(prev => {
      const updated = [...prev, newStudent];
      localStorage.setItem('students', JSON.stringify(updated));
      return updated;
    });

    setSearchText('');
  };

  return (
    <Container>
      <StudentListContainer>
        <TopBar>
          <SearchInput
            type="text"
            placeholder="მოსწავლის სახელი..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={handleAddStudent}>დამატება</Button>
        </TopBar>
        <StudentList>
          {filteredStudents.map((student, index) => (
            <StudentItem key={student.timestamp}>
              {student.name}
              <DeleteButton
                onClick={() => {
                  const updatedStudents = students.filter(s => s.timestamp !== student.timestamp);
                  setStudents(updatedStudents);
                  localStorage.setItem('students', JSON.stringify(updatedStudents));
                }}
              >
                ✕
              </DeleteButton>
            </StudentItem>
          ))}
        </StudentList>
        <ButtonContainer>
          <Button onClick={selectRandomStudent}>შემთხვევითი მოსწავლე</Button>
          <Button onClick={() => handleGroupButtonClick(2)}>2 კაციანი ჯგუფები</Button>
          <Button onClick={() => handleGroupButtonClick(3)}>3 კაციანი ჯგუფები</Button>
          <Button onClick={() => handleGroupButtonClick(4)}>4 კაციანი ჯგუფები</Button>
          <Button onClick={() => handleGroupButtonClick(5)}>5 კაციანი ჯგუფები</Button>
        </ButtonContainer>
      </StudentListContainer>

      {showGroups && (
        <GroupsContainer>
          <GroupsHeader>
            <h2>შექმნილი ჯგუფები</h2>
            <CloseButton onClick={() => setShowGroups(false)}>✕</CloseButton>
          </GroupsHeader>
          <GroupsGrid>
            {groups.map((group, groupIndex) => (
              <GroupCard key={groupIndex}>
                <h3>ჯგუფი {groupIndex + 1}</h3>
                {group.map(student => (
                  <div key={student.timestamp}>{student.name}</div>
                ))}
              </GroupCard>
            ))}
          </GroupsGrid>
        </GroupsContainer>
      )}

      {showMessage && (
        <MessageOverlay>
          <Message>{message}</Message>
        </MessageOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`;

const StudentListContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const GroupsContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const GroupsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #333;
  }
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const GroupCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  div {
    margin: 5px 0;
    color: #666;
  }
`;

const TopBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 18px;
  padding: 0 5px;

  &:hover {
    color: #cc0000;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const MessageOverlay = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const Message = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

export default SearchList;
