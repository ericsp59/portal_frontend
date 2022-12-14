import './main-nav.css'
import {Link, NavLink} from 'react-router-dom'

const MainNav = (props) => {
  const {baseDir} = props
  
  return (
    
    <>
    <div className='main-nav'>

      <nav className="nav nav-tabs">
        <NavLink exact className="nav-link" to={baseDir}>Главная</NavLink>
        <NavLink
          exact
          className="nav-link"
          to="/inventory-page"
        >Инвентаризация</NavLink>
        <NavLink exact className="nav-link" to={baseDir+"templates-page"}>Шаблоны</NavLink>
        <NavLink exact className="nav-link" to={baseDir+"automatization-page"}>Автоматизация</NavLink>
        <NavLink exact className="nav-link" to={baseDir+"control-page"}>Удаленное управление</NavLink>
        <NavLink exact className="nav-link" to={baseDir+"reports-page"}>Отчеты</NavLink>
        <NavLink exact className="nav-link" to={baseDir+"notes-page"}>Заметки</NavLink>
      </nav> 

    </div>
    </>

  );
}

export default MainNav