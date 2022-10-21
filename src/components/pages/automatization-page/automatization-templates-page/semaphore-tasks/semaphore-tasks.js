

const SemaphoreTasks = ({semaphoreTasks, getSemaphoreTaskOutput_loc}) => {
    let elems = []
    if (semaphoreTasks != []) {
        elems = semaphoreTasks.map(el => {
            let taskColor = ''
            if (el.status == 'error') taskColor = 'danger'
            if (el.status == 'success') taskColor = 'success'
            if (el.status == 'waiting') taskColor = 'secondary'
            if (el.status == 'running') taskColor = 'primary'
            return (
                
                    <li key={el.id}
                    className={`list-group-item list-group-item-${taskColor}`}
                    >
                    <p className='p' style={{'marginBottom': '2px'}}>{el.id} - {el.tpl_alias}:</p>
                    <span style={{'float': 'right'}}>{el.status}</span>
                    <span style={{'position': 'absolute','right': '15px', 'bottom': '5px'}}>
                         <button
                            className="btn btn-outline-dark btn-sm"
                            style={{'height': '20px', 'padding': '0', 'width': '55px'}}
                            onClick={() => getSemaphoreTaskOutput_loc(el.id)}
                        >лог</button>
                    </span>
                    <span style={{'display': 'block','color': 'grey','fontSize': 'small'}}>{el.created}</span>
                    </li>

                
            )
        })
    }
    return(
        <div>
            <h4>Задачи</h4>
            <ul className="list-group scroll">
            {elems}
            </ul>
        </div>
    )

}

export default SemaphoreTasks