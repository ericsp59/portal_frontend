import {Component} from 'react';

class AllComputersListItem extends Component {

  state = {
    isLoading: false
  }

  componentDidUpdate() {
    // console.log(this.props.linksData.Manufacturer[0].name)  
  }

  getParametrInfo = (p, pname) => {
    let res = ''
    if (p != "underfined") {
      for (const i in p) {
        if (Array.isArray(p[i])) {
          for (const el in p[i]) {
            res += p[i][el][pname] + ", "
          }
        }
        else {
          res += p[i][pname] + ", "
        }
      }
      
    }
    return res.slice(0, -2)
  }

  render() {
    const {id, name, contact, serial,date_mod, type, manufacturer, model, os, ipAddrArr, Item_DeviceHardDrive, ipAddresses, getSerchComputerInfoById, devicenetworkcards, devicememories, deviceharddrives} = this.props

    if (this.props.Manufacturer != "underfined") {
        // console.log(this.props)
    }
    console.log(deviceharddrives)
    return (
      <div className="row">
        <div className="col-sm-12">
        <div className="card mb-3">
          <h5 className="card-header"><p>{name}</p></h5>
          <div className="card-body">
            <h3 className="card-title"><p>Информация</p></h3>
              <p className="card-text"><b>Производитель: </b>{manufacturer} </p>
              <p className="card-text"><b>Модель: </b>{model} </p>
              <p className="card-text"><b>Серийный номер: </b> {serial}</p>
              <p className="card-text"><b>Тип: </b> {type} </p>
              <p className="card-text"><b>Пользователь: </b> {contact}</p>
              <p className="card-text"><b>Дата изменения: </b> {date_mod}</p>
              <p className="card-text"><b>ОС: </b>{os} </p>
              <p className="card-text"><b>ОЗУ: </b>{devicememories} MB</p>
              <p className="card-text"><b>IP: </b>{ipAddrArr?ipAddrArr.map(el => `${el}, `):''} </p>
          </div>
        </div>
        </div>
      </div>  


 // ////////////////////////////////////////////// 

  //     <div className="row">
  //       { false
  //       ?<>Hello</>
  //       :<div className="col-sm-12">
  //         <div className="card mb-3">
  //         <h5 className="card-header"><p>{name}</p></h5>
  //           <div className="card-body">
  //             <h3 className="card-title"><p>Информация</p></h3>
  //             <p className="card-text"><b>Серийный номер: </b> {serial}</p>
  //             <p className="card-text"><b>Тип: </b> {this.getParametrInfo(this.props.ComputerType,'name')} </p>
  //             <p className="card-text"><b>Пользователь: </b> {contact}</p>
  //             <p className="card-text"><b>Дата изменения: </b> {date_mod}</p>
  //             <p className="card-text"><b>Производитель: {this.getParametrInfo(this.props.Manufacturer, 'name')} </b></p>
  //             <p className="card-text"><b>ОЗУ: {this.getParametrInfo(this.props.Item_DeviceMemory, 'size')} </b></p>
  //             <p className="card-text"><b>IP: {this.props.ipAddresses.map(el => `${el}, `)} </b></p>
  //             {/* <p className="card-text"><b>IP: {this.getComputerIpArr(id)} </b></p> */}
  //             {/* <p className="card-text"><b>Item_DeviceDrive: </b>{Item_DeviceHardDrive}</p> */}
  //             {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  //           </div>
  //         </div>
  //       </div>
  // }
  //     </div>
    )
  }
}

export default AllComputersListItem