import {Component} from 'react'
import AWXService from '../../../services/awx-service'

class TemplatesPage extends Component {

  

  render() {

    const {jobTemplateList, addPlaybookHandler, changeSelectedPlaybookFile} = this.props


    const elements = jobTemplateList.map(elem => {
      const {id,name,playbook} = elem
      return (
        // <>
          <div key={id} className="card text-center border-dark mb-3" style={{"width": "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">ID: {id}</p>
              <p className="card-text">playbook: {playbook}</p>
            </div>
          </div>
        // </>
      )
    })

    return (
      <>
        <div>
        {/* <form> */}
          <div className="form-group">
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
          >Добавить playbook
          
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