
import './semaphore-output.css'

const SemaphoreOutput = ({semaphoreTaskOutput}) => {
// console.log(semaphoreTaskOutput)
const elems = semaphoreTaskOutput.map((el, id) => {

        return (
            <li key={id} className='semaphore_output_li'>
                <p>{el.output}</p>
            </li>
            
        )
})
return(
    <div >
        <h4>Вывод Ansible</h4>
        <div className='semaphore_output_body'>
            <ul className='scroll'>
                {elems}
            </ul>
        </div>

    </div>
    
) 

}


export default SemaphoreOutput