import * as S from './MainButtonArea.styles'

type MainButtonAreaProps = {
  currentScreen: 'calculator' | 'result' | 'payslip';
  isCalculating: boolean;
  isButtonEnabled: boolean;
  onCalculate: () => void;
  onRecalculate: () => void;
  onShowPayslip: (payslipData: PayslipInfoData) => void;
  payslipData: PayslipInfoData;
  onBack: () => void;
  onDownload: () => void;
};
export default function MainButtonArea({ currentScreen,isCalculating,isButtonEnabled,onCalculate,onRecalculate,onShowPayslip,onBack,onDownload,payslipData}: MainButtonAreaProps) {
  if (currentScreen === 'calculator') {
    return (
      <S.ButtonContainerFixed>
        <S.CalculateButton
          onClick={onCalculate}
          disabled={!isButtonEnabled || isCalculating}
        >
          {isCalculating ? '계산 중...' : '계산하기'}
        </S.CalculateButton>
      </S.ButtonContainerFixed>
    );
  }

  if (currentScreen === 'result') {
    return (
      <S.ButtonContainerFixed>
        <S.RecalculateButton onClick={onRecalculate}>다시 계산하기</S.RecalculateButton>
        <S.PayslipButton onClick={() => onShowPayslip(payslipData)}>임금명세서</S.PayslipButton>
      </S.ButtonContainerFixed>
    );
  }

  if (currentScreen === 'payslip') {
    return (
      <S.ButtonContainerFixed>
        <S.BackButton onClick={onBack}>뒤로</S.BackButton>
        <S.DownloadButton onClick={onDownload}>저장하기</S.DownloadButton>
      </S.ButtonContainerFixed>
    );
  }

  return null;
}