import './automatization-page.css'
import { useState, useEffect } from 'react';
import AutomatizationTemplatesPage from './automatization-templates-page/automatization-templates-page'
import SemaphoreOutput from './automatization-templates-page/semaphore-output/semaphore-output'
import SemaphoreTasks from './automatization-templates-page/semaphore-tasks/semaphore-tasks'
import Spinner from '../../spinner/spinner'

const AutomatizationPage = ({getSemaphoreTaskOutput, getSemaphoreTasks,jobTemplateList,setSelectedTemplateIds, keysList, setSelectedKeysIds, selectedTemplatesIds, runSemaphoreTemplate}) => {

  // const [semaphoreTasksIsloaded, setSemaphoreTasksIsloaded] = useState(false);
  // const [semaphoreTasks, setSemaphoreTasks] = useState([]);
  // const [semaphoreTaskOutput, setSemaphoreTaskOutput] = useState([]);

  // const getSemaphoreTaskOutput_loc = (id) => {
  //   getSemaphoreTaskOutput(id)
  //     .then(res => {
  //       setSemaphoreTaskOutput(res)
  //     })
  // }


  // const runSemaphoreTemplateLoc = () => {
  //   console.log(selectedTemplatesIds)
  //   runSemaphoreTemplate()
  // } 

  // useEffect(() => {    
  //   const intervalId = setInterval( () => {
  //     getSemaphoreTasks()
  //     .then(res => {
  //       setSemaphoreTasks(res)
  //       setSemaphoreTasksIsloaded(true)  
  //     })
  //   } 
  //   , 3000)
   
  //  return () => clearInterval(intervalId);
  // },[semaphoreTasks]);

  // const keysElements = keysList.map(elem => {
  //   return (
  //     <li key={elem.id} style={{'listStyleType': 'none'}}>
  //       <p className='p'>
  //         <input
  //           type="checkbox"
  //           onChange={(e) => setSelectedKeysIds(e.target.checked, elem.id)}
  //         /> {elem.id}: {elem.name}
  //       </p>
  //     </li>
  //   )
  // })  

  // const elements = jobTemplateList.map(elem => {
  //   return (
  //     <li key={elem.id} style={{'listStyleType': 'none'}}>
        
  //       <p className='p'>
  //         <input
  //           type="checkbox"
  //           onChange={(e) => setSelectedTemplateIds(e.target.checked, elem.id)}
  //         /> {elem.id}: {elem.name} 
  //       </p>
  //     </li>
  //   )
  // })

  return (
    <div className='automatization-page'>

      <h1>??????????????????????????</h1>

      <AutomatizationTemplatesPage
        getSemaphoreTaskOutput = {getSemaphoreTaskOutput}
        getSemaphoreTasks = {getSemaphoreTasks}
        jobTemplateList = {jobTemplateList}
        setSelectedTemplateIds = {setSelectedTemplateIds}
        keysList = {keysList}
        setSelectedKeysIds = {setSelectedKeysIds}
        selectedTemplatesIds = {selectedTemplatesIds}
        runSemaphoreTemplate = {runSemaphoreTemplate}
      />
      
      {/* <div className='row'>
        <div className='col-sm-6'>
        <h4>??????????????</h4>
          {elements}

        </div>

        <div className='col-sm-6'>
        <h4>?????????????? ????????????</h4>
          {keysElements}
        </div>
        <button
            className='btn btn-success btn-sm'
            onClick={() => runSemaphoreTemplateLoc()}
          >????????????</button>
      </div>

      <hr />

      <div>
        <div className='row'>
          <div className="col-sm-6">
            {semaphoreTasksIsloaded ? 
            <SemaphoreTasks
              semaphoreTasks = {semaphoreTasks}
              getSemaphoreTaskOutput_loc = {getSemaphoreTaskOutput_loc}
            />
            : <Spinner/>
            }
          </div>
          <div className="col-sm-6">
            <SemaphoreOutput
              semaphoreTaskOutput = {semaphoreTaskOutput}
            />
          </div>
          
        </div>
      </div> */}

    </div>
    
  );
}

export default AutomatizationPage