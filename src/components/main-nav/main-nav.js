import './main-nav.css'
import {Link, NavLink} from 'react-router-dom'

const MainNav = () => {
  return (
    <>
    <div className='main-nav'>

      <nav className="nav nav-tabs">
        <NavLink exact className="nav-link" to="/">Главная</NavLink>

        {/* <NavLink exact className="dropdown-toggle nav-link" to="/inventory-page" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Инвентаризация
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><NavLink exact className="nav-link" to="/computers-inventory-page">Компьютеры</NavLink></li>
            <li><NavLink exact className="nav-link" to="/phones-inventory-page">Телефоны</NavLink></li>
            <li><NavLink exact className="nav-link" to="/network-inventory-page">Сетевые устройства</NavLink></li>
          </ul> */}
        
        <NavLink
          exact
          className="nav-link"
          to="/inventory-page"
        >Инвентаризация</NavLink>

        <NavLink exact className="nav-link" to="/templates-page">Шаблоны </NavLink>
        <NavLink exact className="nav-link" to="/automatization-page">Автоматизация</NavLink>
        <NavLink exact className="nav-link" to="/control-page">Удаленное управление</NavLink>
        <NavLink exact className="nav-link" to="/reports-page">Отчеты</NavLink>
      </nav> 

    </div>
    </>

  );
}

export default MainNav