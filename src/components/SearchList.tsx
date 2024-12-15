import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import { Button } from '../styles';
import FacebookButton from './FacebookButton';

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

const ContentWrapper = styled.div<{ showGroups: boolean }>`
  width: 100%;
  max-width: 800px;
  margin: 60px auto 0;
  transition: all 0.3s ease;
  transform: ${props => props.showGroups ? 'translateX(-50%)' : 'translateX(0)'};
  display: flex;
  gap: 20px;
`;

const MainContainer = styled.div<{ showGroups: boolean }>`
  min-width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GroupsContainer = styled(MainContainer)`
  min-width: 100%;
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #4285f4;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
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

const RandomButton = styled(Button)`
  margin: 20px auto;
  display: block;
  background: #9c27b0;
  
  &:hover {
    background: #7b1fa2;
  }
`;

const StudentList = styled.div`
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

interface Student {
  id: number;
  name: string;
  timestamp: number;
}

interface Class {
  name: string;
  students: string[];
}

const SearchList: React.FC = () => {
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
        id: Date.now(),
        name,
        timestamp: Date.now()
      }))
      setStudents(prev => [...newStudents, ...prev])
    } else {
      setStudents(prev => [
        { id: Date.now(), name: searchText.trim(), timestamp: Date.now() },
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

  const handleDeleteStudent = (id: number) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  const handleAddClass = () => {
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

      <ContentWrapper showGroups={showGroups}>
        <MainContainer showGroups={showGroups}>
          <ButtonContainer>
            <FacebookButton />
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
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student.id}>
                <span>{student.name}</span>
                <Button onClick={() => handleDeleteStudent(student.id)}>
                  წაშლა
                </Button>
              </StudentItem>
            ))}
          </StudentList>
        </MainContainer>

        <GroupsContainer>
          {groups.map((group, index) => (
            <div key={index}>
              <h3>ჯგუფი {index + 1}</h3>
              {group.map((student) => (
                <div key={student.id}>{student.name}</div>
              ))}
            </div>
          ))}
        </GroupsContainer>
      </ContentWrapper>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>ახალი კლასის დამატება</h2>
            <Input
              type="text"
              placeholder="კლასის სახელი"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="მოსწავლეების სია (თითო ხაზზე ერთი მოსწავლე)"
              value={studentList}
              onChange={(e) => setStudentList(e.target.value)}
            />
            <ButtonGroup>
              <Button onClick={() => setIsModalOpen(false)}>გაუქმება</Button>
              <Button onClick={handleAddClass}>დამატება</Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default SearchList
