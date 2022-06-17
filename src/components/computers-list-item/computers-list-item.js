import './computers-list-item.css'
import {Component} from 'react';
import glpiLogo from '../../img/GLPI_Logo.png'
import vncLogo from '../../img/vnc.png'
// import JobTemplateList from '../job-template-list/job-template-list';

class ComputerListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    const {id, name, serial, contact, date_mod,ipAddrArr,computerItemToggleCheck,location} = this.props

    const ipAddrEl = ipAddrArr.map(el => {
      return `${el}, `
    })

    return(
    <div className={`${serial ? 'computer-list-item' : 'computer-list-item dark'}`}>
      <p>
      <input type="checkbox" onChange={(e) => computerItemToggleCheck(e.target.checked, ipAddrArr)}/>
        <i className="fa-solid fa-computer"></i>
        <span>
        <b> ID:</b> {id},&nbsp;  
        <b>Name:</b> {name}, &nbsp;
        <b>IP: </b>{ipAddrEl} &nbsp;
        <b>Serial:</b> {serial || 'нет'}, &nbsp;
        <b>User:</b> {contact || 'no'}, &nbsp;
        <b>location:</b> {location || 'no'}, &nbsp;
        {/* <b>date Mod:</b> {date_mod} &nbsp; */}
        </span>
        <a href={"http://glpi.rtkit.local/glpi/front/computer.form.php?id="+id} target="_blank">
          <img src={glpiLogo} alt="" height='15px' />
          </a> &nbsp;
      <a href="https://ya.ru" target="_blank">
        <img src={vncLogo} alt="" height='15px'/>
        </a>
      </p>

      {/* <JobTemplateList /> */}
      <hr />
    </div>
    );
  }
}

export default ComputerListItem