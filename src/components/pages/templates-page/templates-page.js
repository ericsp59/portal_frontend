import {Component} from 'react'
import AWXService from '../../../services/awx-service'

class TemplatesPage extends Component {

  

  render() {

    const {jobTemplateList} = this.props

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
      <div className="card-group">
      {/* <h1> Шаблоны AWX</h1> */}
      {elements}
      </div>
    )
  }



  componentDidMount() {
    // console.log(this.props)
  }
}

export default TemplatesPage