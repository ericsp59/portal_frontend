import {Component} from "react"
import AWXService from "../../services/awx-service"
import './job-template-list.css'


class JobTemplateList extends Component {
  constructor(props){
    super(props)
    // this.getJobTemplateList()
  }

  // state = {
  //   jobTemplateList: []  
  // }

  awxService = new AWXService();
  // getJobTemplateList = () => {
  //   this.awxService.getJobTemplateList()
  //   .then(res => {
  //     console.log(res)
  //     this.setState({
  //       jobTemplateList: res.results  
  //     })
  //   })  
  // }

  render() {
    const {jobTemplateList} = this.props
    const elements = jobTemplateList.map(el => {
      return (
        <li key={el.id}>
          {/* <a 
            className="dropdown-item"
            href={`https://awx-debian11.local/api/v2/system_job_templates/${el.id}/launch/`}
          >{el.name} - {el.id}</a> */}
          <button
            className="dropdown-item"
            onClick={() => this.awxService.launchJobTemplate(`https://awx-debian11.local/api/v2/job_templates/${el.id}/launch/`)}
          >{el.name} - {el.id}</button>
        </li>
      ) 
    })
    // console.log(elements)
    return(
      <div className="job-template-list">
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >AWX Template
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {/* <li><a className="dropdown-item" href="#">Действие</a></li>
            <li><a className="dropdown-item" href="#">Другое действие</a></li>
            <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li> */}
            {elements}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobTemplateList






