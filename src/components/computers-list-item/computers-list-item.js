import './computers-list-item.css'
import {Component} from 'react';
// import JobTemplateList from '../job-template-list/job-template-list';

class ComputerListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    const {id, name, serial, contact, date_mod,ipAddrArr} = this.props
    const ip = ipAddrArr.map((el, key) => {
      if (el !== '127.0.0.1' && el.length > 7 && el.length <= 15 )
        return <span key = {key}>{el}, </span> 
    })
    return(
    <div className={`${serial ? 'computer-list-item' : 'computer-list-item dark'}`}>
      <p>
        <i className="fa-solid fa-computer"></i>
        <b> ID:</b> {id}, <b>Name:</b> {name}, <b>IP: </b>{ip} <b>Serial:</b> {serial || 'no'}, <b>User:</b> {contact || 'no'}, <b>date Mod:</b> {date_mod}
      </p>
      {/* <JobTemplateList /> */}
      <hr />
    </div>
    );
  }
}

export default ComputerListItem