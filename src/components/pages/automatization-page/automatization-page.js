import './automatization-page.css'
// import ComputerList from '../../computers-list/computers-list';

const AutomatizationPage = ({jobTemplateList,setSelectedTemplateIds, keysList, setSelectedKeysIds, runSemaphoreTemplate}) => {

  // console.log(keysList)

  const keysElements = keysList.map(elem => {
    return (
      <li key={elem.id} style={{'listStyleType': 'none'}}>
        <p>
          <input
            type="checkbox"
            onChange={(e) => setSelectedKeysIds(e.target.checked, elem.id)}
          /> {elem.id}: {elem.name}
        </p>
      </li>
    )
  })  

  const elements = jobTemplateList.map(elem => {
    return (
      <li key={elem.id} style={{'listStyleType': 'none'}}>
        <p>
          <input
            type="checkbox"
            onChange={(e) => setSelectedTemplateIds(e.target.checked, elem.id)}
          /> {elem.id}: {elem.name}
        </p>
      </li>
    )
  })

  return (
    <div className='automatization-page'>

      <h1>Автоматизация</h1>
      <div className='row'>
        <div className='col-sm-6'>
        <h4>Шаблоны</h4>
          {elements}

        </div>

        <div className='col-sm-6'>
        <h4>Учетные данные</h4>
          {keysElements}
        </div>
        <button
            className='btn btn-secondary'
            onClick={() => runSemaphoreTemplate()}
          >Запуск</button>
      </div>
      


    </div>
    
  );
}

export default AutomatizationPage