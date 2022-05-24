import './spinner.css'
import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <div className='spinner'>
      <img src={spinner} alt="spinner" />
      <h6>Загрузка данных</h6>
    </div>

  )
}

export default Spinner