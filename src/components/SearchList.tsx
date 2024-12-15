import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
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
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
`;

const StudentList = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StudentItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
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

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s forwards;
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
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
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [className, setClassName] = useState('')
  const [studentList, setStudentList] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem('classes')
    return saved ? JSON.parse(saved) : []
  })

  const handleAddStudent = () => {
    if (!searchTerm.trim()) return
    
    setStudents(prev => [
      { name: searchTerm.trim(), timestamp: Date.now() },
      ...prev
    ])
    setSearchTerm('')
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
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const displayedStudents = searchTerm
    ? classes
        .find(c => c.name === searchTerm)
        ?.students.map(name => ({ name, timestamp: Date.now() })) || 
      students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : students

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="მოსწავლის ძებნა..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleAddStudent}>დამატება</Button>
        <Button onClick={() => setIsModalOpen(true)}>კლასის დამატება</Button>
      </SearchContainer>

      <StudentList>
        {displayedStudents.map((student, index) => (
          <StudentItem key={student.timestamp + index}>
            {student.name}
          </StudentItem>
        ))}
      </StudentList>

      <AddClassModal isOpen={isModalOpen}>
        <h2>კლასის დამატება</h2>
        <SearchInput
          type="text"
          placeholder="კლასის სახელი"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />
        <TextArea
          placeholder="მოსწავლეების სია (თითო ხაზზე ერთი მოსწავლე)"
          value={studentList}
          onChange={e => setStudentList(e.target.value)}
        />
        <Button onClick={handleSaveClass}>შენახვა</Button>
        <Button onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px', background: '#dc3545' }}>
          დახურვა
        </Button>
      </AddClassModal>

      {showSuccess && (
        <SuccessMessage>
          კლასი წარმატებით დაემატა!
        </SuccessMessage>
      )}
    </Container>
  )
}

export default SearchList
