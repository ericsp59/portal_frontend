import './app-info.css'
import { Link } from 'react-router-dom'

const AppInfo = ({ user, djangoLogoutUser }) => {

  return (



      <div className="app-info">
        <div className='app-info-left sm-col-6'>
          <h4>Ростелеком Portal</h4>
        </div>

        <div className='app-info-right sm-col-6'>
          <span className='app-info-right-userName'>
            {user}
          </span>
          {user ? (<Link to='/logout' onClick={djangoLogoutUser}>Выйти</Link>) : (<Link to='/login'>Войти</Link>)}
          {/* <h6>Общее кол-во: </h6> */}
        </div>
      </div>

  );

}

export default AppInfo