
import styled from 'styled-components';

export const PayslipContainer = styled.div`
  width: 100%;
  max-width: 46rem;
  margin: 0 auto;
  text-align: left;
  background-color: white;
  min-width:320px;
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
  font-weight: 700;
`;

export const InfoValue = styled.span`
  font-weight: 400;
`;

export const NetSalarySection = styled.div`
  border-bottom: 1px solid rgba(0, 27, 55, 0.10);
  padding: 1.5rem 0;
`;

export const NetSalaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NetSalaryLabel = styled.span`
  font-size: 16px;
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
   grid-template-columns: 1fr 1fr;
  width:100%;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const DetailCard = styled.div`
width:100%;
  border-radius: 0.5rem;
  display:flex;
  flex-direction:column;
`;


export const DetailList = styled.div`
  padding:1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size:0.9rem;
`;

export const DetailLabel = styled.span`
  color: #374151;
  font-weight: 600;
`;

export const DetailAmount = styled.span`
  font-weight: 600;
  color:#4E5968;
`;

export const TotalRow = styled.div`
  padding: 1.5rem 0 ;
  font-size: 1rem;
  border-bottom:1px solid rgba(0, 27, 55, 0.10);
`;

export const TotalLabel = styled.span<{
  $isDeduction?: boolean;
}>`
  font-weight: 700;
`;

export const TotalAmount = styled.span<{
  $isDeduction?: boolean;
}>`
  font-size: 16px;
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
