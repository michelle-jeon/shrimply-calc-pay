
import styled from 'styled-components';

export const ResultContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const NetSalarySection = styled.div`
  margin-bottom: 1.5rem;
`;

export const NetSalaryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #E5E7EB;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const NetSalaryLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1F2937;
`;

export const NetSalaryAmount = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #10B981;
`;

export const SummarySection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E7EB;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SummaryLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #6B7280;
`;

export const SummaryAmount = styled.span<{
  $isDeduction?: boolean;
}>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $isDeduction }) => ($isDeduction ? '#3B82F6' : '#EF4444')};
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #374151;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

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
`;

// export const PayslipButton = styled.button`
//   flex: 1;
//   padding: 1rem 1.5rem;
//   border-radius: 1rem;
//   font-weight: 600;
//   font-size: 1.125rem;
//   color: white;
//   background-color: #F97316;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #EA580C;
//   }
// `;
