import logo from '../../assets/images/shrimply_logo_color.svg';

export default function Header () {
  return (
    <header className='mb-10'>
      <div className='flex items-center justify-center' >
        <img src={logo} alt="" style={{"width":'150px'}}/>
      </div>
      <p className='text-xs mt-2'style={{"color":'#EF6878'}}>세후 급여 계산기</p>
    </header>
  )
}