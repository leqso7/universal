import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Student {
  name: string;
  timestamp: number;
  classId: string;
}

interface Group {
  id: number;
  members: Student[];
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface Props {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const Container = styled.div<{ $showModal: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
`;

const MainContent = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  gap: 15px;
  width: 100%;
  height: calc(100vh - 350px);
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  margin-top: 10%;
  transition: all 0.3s ease-in-out;
`;

const StudentListContainer = styled.div`
  flex: 1;
  min-width: 700px;
  max-width: 700px;
  height: 650px;
  background: rgba(255, 255, 255, 0.98);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SelectButton = styled.button`
  padding: 10px 20px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 15px;

  &:hover {
    background: #3367d6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SelectedStudent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #1a73e8;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  text-transform: uppercase;
  animation: fadeIn 0.3s ease;
  max-width: 90vw;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
    padding: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    padding: 20px;
  }
`;

const Overlay = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, ${props => props.$show ? '0.5' : '0'});
  backdrop-filter: blur(${props => props.$show ? '8px' : '0px'});
  z-index: 1000;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background, backdrop-filter, opacity;
`;

const GroupsContainer = styled.div<{ $show: boolean; $isFullscreen: boolean }>`
  flex: 1;
  min-width: ${props => props.$isFullscreen ? '100vw' : '700px'};
  max-width: ${props => props.$isFullscreen ? '100vw' : '700px'};
  height: ${props => props.$isFullscreen ? '100vh' : '650px'};
  background: rgba(255, 255, 255, 0.98);
  padding: 20px;
  border-radius: ${props => props.$isFullscreen ? '0' : '12px'};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  display: ${props => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  position: ${props => props.$isFullscreen ? 'fixed' : 'relative'};
  margin-top: ${props => props.$isFullscreen ? '0' : '40px'};
  top: ${props => props.$isFullscreen ? '0' : 'auto'};
  left: ${props => props.$isFullscreen ? '0' : 'auto'};
  z-index: ${props => props.$isFullscreen ? '1000' : '1'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => {
    if (!props.$show) return 'translateX(50px) scale(0.95)';
    if (props.$isFullscreen) return 'none';
    return 'translateX(0) scale(1)';
  }};
`;

const GroupsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const GroupControls = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
`;

const GroupTitle = styled.h2<{ $isFullscreen?: boolean }>`
  margin: 0;
  font-size: ${props => props.$isFullscreen ? '32px' : '24px'};
  color: #333;
`;

const GroupsContent = styled.div<{ $isFullscreen: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.$isFullscreen ? '20px' : '10px'};
`;

const GroupGrid = styled.div<{ $isFullscreen: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$isFullscreen ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fill, minmax(250px, 1fr))'};
  gap: 20px;
  padding: 10px;
`;

const StudentList = styled.div`
  margin-top: 15px;
  max-height: 420px;
  overflow-y: auto;
  flex: 1;
  
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

const GroupCard = styled.div`
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const GroupMemberList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GroupMember = styled.div`
  padding: 8px;
  margin: 4px 0;
  background: white;
  border-radius: 4px;
  transform: scale(1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px) scale(1.02);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  font-size: 24px;
  cursor: pointer;
  padding: 0 5px;
  transition: all 0.2s ease;

  &:hover {
    color: #ff0000;
    transform: scale(1.1);
  }
`;

const StudentCard = styled.div<{ $isRemoving: boolean }>`
  background: white;
  padding: 12px;
  margin: 6px 0;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  animation: ${props => props.$isRemoving ? 'slideOut' : 'slideIn'} 0.3s ease-in-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: auto;
  padding-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const AddButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AddClassButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  z-index: 10;
  
  &:hover {
    background: #45a049;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  filter: none !important;
  backdrop-filter: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 20px;
  background: ${props => props.$primary ? '#4CAF50' : '#e0e0e0'};
  color: ${props => props.$primary ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.$primary ? '#45a049' : '#d0d0d0'};
  }
`;

const NumberButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  background: ${props => props.$active ? '#007bff' : '#e9ecef'};
  color: ${props => props.$active ? 'white' : '#495057'};
  cursor: pointer;
  transform: scale(1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    background: ${props => props.$active ? '#0056b3' : '#dee2e6'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StudentCount = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #666;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  z-index: 1002;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SearchList: React.FC<Props> = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState('');
  const [studentsList, setStudentsList] = useState('');
  const [classes, setClasses] = useState<Class[]>(() => {
    const savedClasses = localStorage.getItem('classes');
    return savedClasses ? JSON.parse(savedClasses) : [];
  });
  const [selectedSize, setSelectedSize] = useState<number>(3);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentSelected, setCurrentSelected] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);

  useEffect(() => {
    const savedClasses = localStorage.getItem('classes');
    if (savedClasses) {
      try {
        const parsedClasses = JSON.parse(savedClasses);
        setClasses(parsedClasses);
      } catch (error) {
        console.error('Error parsing saved classes:', error);
        toast.error('კლასების ჩატვირთვა ვერ მოხერხდა');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStudent = (timestamp: number, classId: string) => {
    setStudents(prevStudents => {
      if (prevStudents.length === 0) {
        return prevStudents;
      }

      const studentIndex = prevStudents.findIndex(student => 
        student.timestamp === timestamp && student.classId === classId
      );
      
      if (studentIndex === -1) return prevStudents;
      
      const newStudents = [...prevStudents];
      newStudents.splice(studentIndex, 1);
      return newStudents;
    });
  };

  const handleGroupSize = (size: number) => {
    if (students.length < 4) {
      toast.error('მინიმუმ 4 მოსწავლე ჯგუფების შესაქმნელად');
      return;
    }

    // Shuffle students
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const totalStudents = shuffled.length;

    // Calculate number of groups ensuring minimum 2 students per group
    const maxGroups = Math.floor(totalStudents / 2); // მაქსიმალური ჯგუფების რაოდენობა (მინ. 2 კაცი)
    const requestedGroups = Math.ceil(totalStudents / size); // მოთხოვნილი ჯგუფების რაოდენობა
    const numGroups = Math.min(maxGroups, requestedGroups);

    // Calculate minimum students per group and extras
    const minStudentsPerGroup = Math.floor(totalStudents / numGroups);
    const extraStudents = totalStudents % numGroups;

    // Create groups with even distribution
    const newGroups: Group[] = [];
    let currentIndex = 0;

    for (let i = 0; i < numGroups; i++) {
      // Add one extra student to early groups if we have remainder
      const groupSize = i < extraStudents ? minStudentsPerGroup + 1 : minStudentsPerGroup;
      
      newGroups.push({
        id: Date.now() + i,
        members: shuffled.slice(currentIndex, currentIndex + groupSize)
      });
      
      currentIndex += groupSize;
    }

    setGroups(newGroups);
    setSelectedSize(size);
    setIsExpanded(true);
  };

  const handleAddClass = () => {
    if (!className.trim()) {
      toast.error('გთხოვთ შეიყვანოთ კლასის სახელი', {
        autoClose: 2000,
        hideProgressBar: false,
      });
      return;
    }

    const classId = Date.now().toString();

    const newStudents = studentsList
      .split('\n')
      .map(name => name.trim())
      .filter(name => name)
      .map((name, index) => ({
        name,
        timestamp: Date.now() + index,
        classId
      }));

    if (newStudents.length === 0) {
      toast.error('გთხოვთ შეიყვანოთ მინიმუმ ერთი მოსწავლე', {
        autoClose: 2000,
        hideProgressBar: false,
      });
      return;
    }

    const existingClassIndex = classes.findIndex(c => 
      c.name.toLowerCase() === className.toLowerCase()
    );

    if (existingClassIndex !== -1) {
      const updatedClasses = [...classes];
      updatedClasses[existingClassIndex] = {
        ...updatedClasses[existingClassIndex],
        students: [...updatedClasses[existingClassIndex].students, ...newStudents]
      };
      
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      toast.success('კლასი წარმატებით განახლდა!', {
        autoClose: 2000,
        hideProgressBar: false,
      });
    } else {
      const newClass: Class = {
        id: classId,
        name: className.trim(),
        students: newStudents
      };

      const updatedClasses = [...classes, newClass];
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      toast.success('კლასი წარმატებით დაემატა!', {
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
    
    setClassName('');
    setStudentsList('');
    setShowModal(false);
  };

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (!term) {
      toast.error('გთხოვთ შეიყვანოთ მოსწავლის/კლასის სახელი');
      return;
    }

    try {
      const savedClasses: Class[] = JSON.parse(localStorage.getItem('classes') || '[]');
      const foundClass = savedClasses.find(c => 
        c.name.toLowerCase() === term.toLowerCase()
      );

      if (foundClass && Array.isArray(foundClass.students)) {
        const newStudents: Student[] = foundClass.students.map((student: { name: string, classId: string }) => ({
          name: student.name,
          timestamp: Date.now(),
          classId: student.classId
        }));

        const existingNames = students.map(s => s.name.toLowerCase());
        const uniqueNewStudents = newStudents.filter(
          student => !existingNames.includes(student.name.toLowerCase())
        );

        if (uniqueNewStudents.length === 0) {
          return;
        }

        setStudents(prev => [...prev, ...uniqueNewStudents]);
        toast.success(`დაემატა ${uniqueNewStudents.length} მოსწავლე`);
      } else {
        const existingStudent = students.find(
          s => s.name.toLowerCase() === term.toLowerCase()
        );

        if (existingStudent) {
          return;
        }

        const newStudent: Student = {
          name: term,
          timestamp: Date.now(),
          classId: ''
        };

        setStudents(prev => [...prev, newStudent]);
      }
    } catch (error) {
      console.error('Error processing search:', error);
      toast.error('დაფიქსირდა შეცდომა ძებნისას');
    }

    setSearchTerm('');
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleRandomSelect = () => {
    if (isSelectionDisabled) {
      return;
    }

    const availableStudents = students.filter(student => 
      !selectedStudents.includes(student.name)
    );

    if (availableStudents.length === 0) {
      setSelectedStudents([]);
      setCurrentSelected(null);
      setShowOverlay(false);
      setIsSelectionDisabled(true);
      toast.info('ყველა მოსწავლე შერჩეულია! ვიწყებთ თავიდან.', {
        autoClose: 3000,
        hideProgressBar: false,
      });
      
      // 3 წამის შემდეგ ვრთავთ ღილაკს
      setTimeout(() => {
        setIsSelectionDisabled(false);
      }, 3000);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const selectedStudent = availableStudents[randomIndex];
    setCurrentSelected(selectedStudent.name);
    setSelectedStudents([...selectedStudents, selectedStudent.name]);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
    }, 7000);
  };

  const handleExpandGroups = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <Container $showModal={showModal}>
      <Overlay $show={showOverlay} />
      {showOverlay && <CloseButton onClick={handleCloseOverlay}>×</CloseButton>}
      {currentSelected && showOverlay && (
        <SelectedStudent>
          {currentSelected}
        </SelectedStudent>
      )}
      <ContentWrapper>
        <SearchBar>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="მოსწავლის/კლასის სახელი..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <AddButton onClick={handleSearch}>დამატება</AddButton>
        </SearchBar>

        <AddClassButton onClick={() => setShowModal(true)}>
          კლასის დამატება
        </AddClassButton>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>კლასის დამატება</ModalTitle>
              <Input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="კლასის სახელი..."
              />
              <TextArea
                value={studentsList}
                onChange={(e) => setStudentsList(e.target.value)}
                placeholder="ჩაწერეთ მოსწავლეების სია (თითო ხაზზე თითო მოსწავლე)..."
              />
              <ButtonGroup>
                <Button onClick={() => setShowModal(false)}>გაუქმება</Button>
                <Button $primary onClick={handleAddClass}>შენახვა</Button>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
        <MainContent $isExpanded={isExpanded}>
          <StudentListContainer>
            <SelectButton 
              onClick={handleRandomSelect}
              disabled={isSelectionDisabled}
              style={{ opacity: isSelectionDisabled ? 0.5 : 1 }}
            >
              მოსწავლის არჩევა
            </SelectButton>
            <StudentCount>
              მოსწავლეების რაოდენობა: {students.length}
            </StudentCount>

            <StudentList>
              {filteredStudents.map((student) => (
                <StudentCard key={student.timestamp} $isRemoving={false}>
                  <span>{student.name}</span>
                  <DeleteButton 
                    onClick={() => handleRemoveStudent(student.timestamp, student.classId)}
                  >
                    ×
                  </DeleteButton>
                </StudentCard>
              ))}
            </StudentList>

            <ButtonContainer>
              {[2, 3, 4, 5, 6].map((size) => (
                <NumberButton
                  key={size}
                  onClick={() => handleGroupSize(size)}
                  $active={selectedSize === size}
                >
                  {size}
                </NumberButton>
              ))}
            </ButtonContainer>
          </StudentListContainer>

          <GroupsContainer $show={isExpanded} $isFullscreen={isFullscreen}>
            <GroupsHeader>
              <GroupTitle $isFullscreen={isFullscreen}>შექმნილი ჯგუფები</GroupTitle>
              <GroupControls>
                {isFullscreen ? (
                  <IconButton onClick={handleCloseFullscreen} title="დახურვა">
                    ×
                  </IconButton>
                ) : (
                  <></>
                )}
              </GroupControls>
            </GroupsHeader>

            <GroupsContent $isFullscreen={isFullscreen}>
              <GroupGrid $isFullscreen={isFullscreen}>
                {groups.map((group, index) => (
                  <GroupCard key={group.id}>
                    <GroupTitle>ჯგუფი {index + 1}</GroupTitle>
                    <GroupMemberList>
                      {group.members.map(student => (
                        <GroupMember key={student.timestamp}>
                          {student.name}
                        </GroupMember>
                      ))}
                    </GroupMemberList>
                  </GroupCard>
                ))}
              </GroupGrid>
            </GroupsContent>
          </GroupsContainer>
        </MainContent>
      </ContentWrapper>
    </Container>
  );
}

export default SearchList;
