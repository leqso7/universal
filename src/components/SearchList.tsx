import styled from 'styled-components';
import { useState } from 'react';

const SearchListContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto 20px;
  
  &:hover {
    background: #3367d6;
  }
`;

const SearchItem = styled.div`
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
  cursor: pointer;
  font-size: 18px;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#4285f4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#3367d6' : '#f5f5f5'};
  }
`;

const SearchButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background: #45a049;
  }
`;

const SearchList = () => {
  const [items] = useState(Array(4).fill('საძიებელი'));
  const [currentPage] = useState(2);
  const totalPages = 7;

  return (
    <SearchListContainer>
      <Title>მოსწავლეების რაოდენობა: 7</Title>
      <Button>მეხსიერების შემოწმება</Button>
      
      {items.map((item, index) => (
        <SearchItem key={index}>
          {item}
          <DeleteButton>×</DeleteButton>
        </SearchItem>
      ))}
      
      <SearchButton>გაფილტვრა</SearchButton>
      
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton key={index} active={currentPage === index + 1}>
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </SearchListContainer>
  );
};

export default SearchList;
