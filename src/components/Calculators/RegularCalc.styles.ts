
import styled from 'styled-components';

export const AllowanceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-grow: 1;
  padding-top: 1.25rem;
`;

export const SectionTitle = styled.span`
  color: #9CA3AF;
  font-weight: 600;
`;

export const AllowanceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AllowanceLabel = styled.label`
  font-size: 0.875rem;
  color: #4B5563;
  width: 5rem;
  font-weight: 600;
`;

export const TotalAmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid #E5E7EB;
`;

export const TotalAmountLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
`;

export const TotalAmount = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3B82F6;
`;

export const DeductionSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #E5E7EB;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2.5rem;
  }
`;

export const DeductionRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 1.25rem;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background: linear-gradient(to right, #ed8e5f33, #0220470d 50%);
  height: 2.25rem;
  position: relative;
  border-radius: 0.5rem;
`;

export const ToggleButton = styled.button<{
  $isActive: boolean;
}>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  margin: 0.25rem;
  flex-grow: 1;
  background-color: ${({ $isActive }) => ($isActive ? 'white' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#F97316' : '#6B7280')};
  &:hover {
    color: ${({ $isActive }) => ($isActive ? '#F97316' : '#4B5563')};
  }
`;

export const InsuranceContainer = styled.div`
  padding-top: 1.25rem;
  text-align: left;
`;

export const InsuranceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const InsuranceLabel = styled.label<{
  $isChecked?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${({ $isChecked }) => ($isChecked ? '#D1D5DB' : '#F3F4F6')};
`;

export const Checkbox = styled.input`
  display: none;
`;

export const CheckboxIcon = styled.div<{
  $isChecked: boolean;
}>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${({ $isChecked }) => ($isChecked ? '#9CA3AF' : '#D1D5DB')};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 0.75rem;
    height: 0.75rem;
    color: ${({ $isChecked }) => ($isChecked ? '#9CA3AF' : '#D1D5DB')};
  }
`;

export const InsuranceText = styled.span<{
  $isChecked: boolean;
}>`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ $isChecked }) => ($isChecked ? '#6B7280' : '#9CA3AF')};
`;
