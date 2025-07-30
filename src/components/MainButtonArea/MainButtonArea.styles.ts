import styled from 'styled-components';

export const ButtonContainerFixed = styled.div`
  position:fixed;
  bottom:0;
  left:0;
  padding:20px;
`

export const CalculateButton = styled.button<{disabled:boolean}>`
  width: 100%;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
  margin-top: 1.5rem;
  transition: all 0.2s ease-in-out;
  background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#F97316')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#EA580C')};
  }
`

export const RecalculateButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: #374151;
  background-color: #E5E7EB;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #D1D5DB;
  }
`

export const PayslipButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: white;
  background-color: #F97316;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #EA580C;
  }
`

export const DownloadButton = styled.button`
flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: white;
  background-color: #F97316;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #EA580C;
  }
`