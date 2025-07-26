import logo from '../../assets/images/shrimply_logo_color.svg';
import * as S from './Header.styles';

export default function Header () {
  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        <S.Logo src={logo} alt="" />
      </S.LogoContainer>
      <S.Subtitle>세후 급여 계산기</S.Subtitle>
    </S.HeaderContainer>
  )
}