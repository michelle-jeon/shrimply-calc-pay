
import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    border-radius: 9999px;
    padding: 0.5rem;
  }
`;

export const TabButton = styled.button<{
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  background-color: ${({ $isActive }) => ($isActive ? '#E5E7EB' : 'transparent')};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#111827' : '#4B5563')};

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#E5E7EB' : '#F3F4F6')};
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const TabName = styled.span`
  font-size: 1rem;
`;

export const Separator = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline;
    color: #9CA3AF;
    margin: 0 0.5rem;
  }
`;

export const TabInfo = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
`;
