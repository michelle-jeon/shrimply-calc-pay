
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem;
  margin: 1rem;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  width: 5rem;
  text-align: left;

  &.required::after {
    content: ' *';
    color: #EF4444;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;

  &:focus {
    ring: 2px;
    ring-color: #3B82F6;
    border-color: transparent;
  }
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;

  &:focus {
    ring: 2px;
    ring-color: #3B82F6;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const CloseButton = styled.button`
  flex: 1;
  padding: 1rem 0;
  border-radius: 0.5rem;
  color: #374151;
  font-weight: 500;
  font-size: 1.125rem;
  border: 1px solid #D1D5DB;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #F9FAFB;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 1rem 0;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
  transition: all 0.2s ease-in-out;
  background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#F97316')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#EA580C')};
  }
`;
