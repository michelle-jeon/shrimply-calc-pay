
import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:8px;
  background-color: white;
  border-radius: 9999px;
  padding: 0.5rem;
  box-shadow: 0px 2px 30px 0px rgba(0, 27, 55, 0.10);
`;

export const TabButton = styled.button<{
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 27px;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  background-color: ${({ $isActive }) => ($isActive ? 'rgba(2, 32, 71, 0.05)' : 'transparent')};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#111827' : '#4B5563')};
  word-break: keep-all;

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
  display: none;
  font-size: 0.875rem;
  color: #6B7280;
  @media (min-width: 768px) {
    display: inline;
  }
`;
