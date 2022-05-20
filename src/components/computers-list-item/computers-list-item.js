import './computers-list-item.css'
import {Component} from 'react';
import JobTemplateList from '../job-template-list/job-template-list';

class ComputerListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    const {name, serial, contact, date_mod} = this.props
    return(
    <div className={`${serial ? 'computer-list-item' : 'computer-list-item dark'}`}>
      <p>
        <i className="fa-solid fa-computer"></i>
        <b>Name:</b> {name}, <b>Serial:</b> {serial || 'no'}, <b>User:</b> {contact || 'no'}, <b>date Mod:</b> {date_mod}
      </p>
      {/* <JobTemplateList /> */}
      <hr />
    </div>
    );
  }
}

// const ComputerListItem = (props) => {
//   const {name, serial, contact, date_mod} = props
//   return(
//     <div className={serial ? 'computer-list-item' : 'computer-list-item dark'}>
//       <i className="fa-solid fa-computer"></i>
//       <span> <b>Name:</b> {name}, <b>Serial:</b> {serial || 'no'}, <b>User:</b> {contact || 'no'}, <b>date Mod:</b> {date_mod}</span>
//       <hr />
//     </div>
//   );
// }



export default ComputerListItem