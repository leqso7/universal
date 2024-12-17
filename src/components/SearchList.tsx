import React, { useState } from 'react';
import styled from 'styled-components';

export interface Student {
  name: string;
  timestamp: number;
}

interface Group {
  id: number;
  members: Student[];
}

interface Props {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #45a049;
  }
`;

const MainContent = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-top: 80px;
  transition: all 0.3s ease-in-out;
  
  ${props => props.showGroups && `
    transform: translateX(-50%);
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0px;
  width: 100%;
  max-width: 1200px;
  transition: all 0.3s ease-in-out;
`;

const GroupsContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-top: 80px;
    margin-left: 5px;
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
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #000;
  }
`;

const StudentList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

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
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  
  &:hover {
    color: #cc0000;
  }
`;

const GroupButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const GroupButton = styled.button`
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #45a049;
  }
`;

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 10px;
`;

const GroupCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const GroupTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
`;

const GroupMemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const GroupMember = styled.li`
  padding: 4px 0;
`;

function SearchList({ students, setStudents }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showGroups, setShowGroups] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (!searchTerm.trim()) return;
    
    const newStudent: Student = {
      name: searchTerm.trim(),
      timestamp: Date.now()
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setSearchTerm('');
  };

  const handleDeleteStudent = (timestamp: number) => {
    const updatedStudents = students.filter(student => student.timestamp !== timestamp);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const createGroups = (size: number) => {
    if (filteredStudents.length === 0) return;

    const shuffled = [...filteredStudents].sort(() => Math.random() - 0.5);
    const newGroups: Group[] = [];
    
    for (let i = 0; i < shuffled.length; i += size) {
      newGroups.push({
        id: Date.now() + i,
        members: shuffled.slice(i, i + size)
      });
    }

    setGroups(newGroups);
    setShowGroups(true);
  };

  return (
    <Container>
      <SearchBar>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="მოსწავლის სახელი..."
        />
        <AddButton onClick={handleAddStudent}>დამატება</AddButton>
      </SearchBar>

      <ContentWrapper>
        <MainContent showGroups={showGroups}>
          <h2>მოსწავლეების რაოდენობა: {filteredStudents.length}</h2>
          <StudentList>
            {filteredStudents.map((student) => (
              <StudentItem key={student.timestamp}>
                <span>{student.name}</span>
                <DeleteButton onClick={() => handleDeleteStudent(student.timestamp)}>×</DeleteButton>
              </StudentItem>
            ))}
          </StudentList>

          <GroupButtons>
            {[2, 3, 4, 5, 6, 7].map(size => (
              <GroupButton key={size} onClick={() => createGroups(size)}>
                {size}
              </GroupButton>
            ))}
          </GroupButtons>
        </MainContent>

        {showGroups && (
          <GroupsContainer>
            <GroupsHeader>
              <h2>შექმნილი ჯგუფები</h2>
              <CloseButton onClick={() => setShowGroups(false)}>×</CloseButton>
            </GroupsHeader>
            <GroupGrid>
              {groups.map((group, index) => (
                <GroupCard key={group.id}>
                  <GroupTitle>ჯგუფი {index + 1}</GroupTitle>
                  <GroupMemberList>
                    {group.members.map(member => (
                      <GroupMember key={member.timestamp}>{member.name}</GroupMember>
                    ))}
                  </GroupMemberList>
                </GroupCard>
              ))}
            </GroupGrid>
          </GroupsContainer>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default SearchList;
