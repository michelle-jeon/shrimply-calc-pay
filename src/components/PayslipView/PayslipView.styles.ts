
import styled from 'styled-components';

export const PayslipContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1.5rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  color: #4B5563;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  color: #1F2937;
  font-weight: 600;
`;

export const NetSalarySection = styled.div`
  background-color: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const NetSalaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NetSalaryLabel = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
`;

export const NetSalaryAmount = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #16A34A;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const DetailCard = styled.div<{
  $isDeduction?: boolean;
}>`
  background-color: ${({ $isDeduction }) => ($isDeduction ? '#FEF2F2' : '#EFF6FF')};
  border: 1px solid ${({ $isDeduction }) => ($isDeduction ? '#FECACA' : '#BFDBFE')};
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

export const DetailTitle = styled.h3<{
  $isDeduction?: boolean;
}>`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ $isDeduction }) => ($isDeduction ? '#991B1B' : '#1E40AF')};
  margin-bottom: 1rem;
  text-align: center;
`;

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const DetailLabel = styled.span`
  color: #374151;
`;

export const DetailAmount = styled.span<{
  $isDeduction?: boolean;
}>`
  font-weight: 600;
  color: ${({ $isDeduction }) => ($isDeduction ? '#DC2626' : '#2563EB')};
`;

export const TotalRow = styled.div`
  border-top: 1px solid ${({ $isDeduction }) => ($isDeduction ? '#FCA5A5' : '#93C5FD')};
  margin-top: 1rem;
  padding-top: 1rem;
`;

export const TotalLabel = styled.span<{
  $isDeduction?: boolean;
}>`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ $isDeduction }) => ($isDeduction ? '#991B1B' : '#1E40AF')};
`;

export const TotalAmount = styled.span<{
  $isDeduction?: boolean;
}>`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ $isDeduction }) => ($isDeduction ? '#DC2626' : '#2563EB')};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const BackButton = styled.button`
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
`;
