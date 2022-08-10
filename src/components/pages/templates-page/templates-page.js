import {Component} from 'react'
import AWXService from '../../../services/awx-service'

class TemplatesPage extends Component {

  

  render() {

    const {jobTemplateList, addPlaybookHandler, changeSelectedPlaybookFile, deleteTemplate, newTemplateName, changeInputNewTemplateName} = this.props


    const elements = jobTemplateList.map(elem => {
      const {id,name,playbook} = elem
      return (
        // <>
          <div key={id} className="card text-center border-dark sm-3" style={{"width": "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">ID: {id}</p>
              <p className="card-text">{playbook}</p>

            </div>
            <div className="card-footer">
              <button className='btn btn-danger'
                  onClick={() => deleteTemplate(id)}
                >Удалить</button>
            </div>
          </div>
        // </>
      )
    })

    return (
      <>
        <div>
        {/* <form> */}
          <h4>Создать шаблон</h4>
          <div className="form-group">
            <label htmlFor="inputPlaybookName">Введите имя</label>
            <input 
              className="form-control .form-control-sm"
              type="text" id="inputPlaybookName"
              value={newTemplateName}
              onChange={(e) => changeInputNewTemplateName(e.target.value)}
            />
            <label htmlFor="inputPlaybookFile">Выберите playbook</label>
            <input
              type="file"
              className="form-control .form-control-sm"
              id="inputPlaybookFile"
              // value={selectedPlaybookFileName}
              // value=''
              onChange={(e) => changeSelectedPlaybookFile(e.target.files[0])}
            />
            <small id="emailHelp" className="form-text text-muted">Загрузите файл .yaml.</small>
          </div>
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
          <button
            className="btn btn-primary"
            onClick={() => addPlaybookHandler('addPlaybookHandler')}
          >Добавить Шаблон
          
          </button>
        {/* </form> */}
        </div>


        <hr />
        <div className="card-group">
        {/* <h1> Шаблоны AWX</h1> */}
        {elements}
        </div>
      </>
    )
  }



  componentDidMount() {
    // console.log(this.props)
  }
}

export default TemplatesPage