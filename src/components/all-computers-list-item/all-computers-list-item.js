import {Component} from 'react';

class AllComputersListItem extends Component {

  state = {
    isLoading: false
  }



  componentDidUpdate() {
    // console.log(this.props.linksData.Manufacturer[0].name)  
  }

  render() {
    const {id, name, contact, serial,date_mod} = this.props.linksData

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-3">
          <h5 className="card-header"><p>{name}</p></h5>
            <div className="card-body">
              <h3 className="card-title"><p>Информация</p></h3>
              <p className="card-text"><b>Серийный номер: </b> {serial}</p>
              <p className="card-text"><b>Пользователь: </b> {contact}</p>
              <p className="card-text"><b>Дата изменения: </b> {date_mod}</p>
              <p className="card-text"><b>Производитель: </b></p>
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllComputersListItem