import logo from '../../assets/images/shrimply_logo_color.svg';

export default function Header () {
  return (
    <header className='mb-10'>
      <div className='' style={{"width":'150px'}}>
        <img src={logo} alt="" />
      </div>
    </header>
  )
}