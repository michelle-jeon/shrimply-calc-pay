
import styled from 'styled-components';

export const SectionContainer = styled.div`
  background-color: #ffffff;
  position: relative;
  border-radius: 1rem;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

export const SectionTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  text-align: left;
  color: #111827;
  margin-bottom: 1.75rem;
`;

// export const CalculateButton = styled.button`
//   width: 100%;
//   padding: 0.75rem 0;
//   border-radius: 0.75rem;
//   color: white;
//   font-weight: 500;
//   font-size: 1.125rem;
//   margin-top: 1.5rem;
//   transition: all 0.2s ease-in-out;
//   background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#F97316')};
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

//   &:hover {
//     background-color: ${({ disabled }) => (disabled ? '#D1D5DB' : '#EA580C')};
//   }
// `;
