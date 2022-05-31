import './main-nav.css'

const MainNav = () => {
  return (
    <div className='main-nav'>
      <h6>Какое-нибудь меню</h6>
      <hr />
      <nav className="nav flex-column">
        <a className="nav-link active" href="#">Инвентаризация</a>
        <a className="nav-link" href="#">Шаблоны автоматизации</a>
        <a className="nav-link" href="#">Автоматизация\Управление</a>
        <a className="nav-link disabled" href="#">Удаленное управление</a>
      </nav>
    </div>

  );
}

export default MainNav