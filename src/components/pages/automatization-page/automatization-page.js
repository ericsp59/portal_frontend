import './automatization-page.css'
// import ComputerList from '../../computers-list/computers-list';

const AutomatizationPage = ({jobTemplateList,setSelectedTemplateIds, runTemplateonSelectedIds}) => {

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
      {elements}
      <button
        className='btn btn-secondary'
        onClick={() => runTemplateonSelectedIds()}
      >Запуск</button>
    </div>
    
  );
}

export default AutomatizationPage