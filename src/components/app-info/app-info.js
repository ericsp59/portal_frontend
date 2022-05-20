import './app-info.css'

const AppInfo = ({count}) => {
  return (
    <div className="app-info">
      <h4>Тест API</h4>
      <h6>Общее кол-во: {count}</h6>
    </div>
  );
}

export default AppInfo