
import styled from 'styled-components';

export const SectionContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  width: 100%;
  max-width: 700px;
`;

export const SectionTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  text-align: left;
  color: #111827;
  margin-bottom: 1.75rem;
`;

export const ButtonContainerFixed = styled.div`
  width:100%;
  background-color:#fff;
  position:fixed;
  bottom:0;
  left:0;
  box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.10);
  padding:20px;
  display:flex;
  gap:8px;
  align-items:center;
  min-width:320px;
`

export const CalcuatedAmountBox = styled.div`
  flex:2;
  text-align:right;
  color:red;
  font-weight:bold;
`

export const CalculatedKey = styled.span`
  font-size:12px;
`

export const CalculatedAmount = styled.div`
  font-size:16px;
`

export const CalculateButton = styled.button`
  flex:1;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
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
