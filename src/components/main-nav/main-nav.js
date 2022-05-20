import './main-nav.css'

const MainNav = () => {
  return (
    <div className='main-nav'>
      <h6>Какое-нибудь меню</h6>
      <hr />
      <nav className="nav flex-column">
        <a className="nav-link active" href="#">Link</a>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link disabled" href="#">Disabled</a>
      </nav>
    </div>

  );
}

export default MainNav