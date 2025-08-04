
import styled from 'styled-components';

export const CalculatorContainer = styled.div`
  text-align: left;
  // padding-bottom: 1rem;
  padding: 0 2rem
`;

export const InputRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  color: #374151;
  font-weight: 600;
  width: 60px;

  &.required::after {
    content: ' *';
    color: #EF4444;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
`;

export const Input = styled.input`
  flex-grow: 1;
  text-align: right;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const CurrencyLabel = styled.span`
  margin-left: 0.5rem;
  color: #6B7280;
`;

export const Select = styled.select`
  border: 1px solid #D1D5DB;
  display: flex;
  flex-grow: 1;
  text-align: right;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
`;

export const ErrorMessage = styled.p`
  padding-top: 0.5rem;
  color: #EF4444;
`;
