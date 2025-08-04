
import styled from 'styled-components';

export const PayslipContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  text-align: left;
  // padding: 1rem;
  background-color: white;

  @media (min-width: 640px) {
    // padding: 1.5rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1.5rem;
`;

export const InfoRowWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:0.5rem;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4E5968;
  font-size:14px;
`;

export const NameLabel = styled.span`
  
  font-weight: 600;
`;

export const InfoValue = styled.span`
  font-weight: 400;
`;

export const NetSalarySection = styled.div`
  border-bottom: 1px solid rgba(0, 27, 55, 0.10);
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
  font-size: 1rem;
  font-weight: 700;
  color: #1F2937;
`;

export const NetSalaryAmount = styled.span`
  font-size: 1rem;
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

export const TotalRow = styled.div<{ $isDeduction?: boolean }>`
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

export const ButtonContainerFixed = styled.div`
  width:100%;
  background-color:#fff;
  position:fixed;
  bottom:0;
  left:0;
  box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.10);
  padding:20px;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content:flex-end;
`;

export const BackButton = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: #374151;
  background-color: #E5E7EB;
  transition: all 0.2s ease-in-out;
  min-width:200px;
  @media (max-width: 640px) {
    flex:1;
  }
  &:hover {
    background-color: #D1D5DB;
  }
`;

export const DownloadButton = styled.button`
  flex: 2;
  max-width:400px;
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
