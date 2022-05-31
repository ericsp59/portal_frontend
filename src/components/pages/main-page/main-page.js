import {Component} from 'react'

class MainPage extends Component {
  
  render (){
    const {computerListTotalCount} =  this.props

    return(
      <>
        {/* <h1>Главная</h1> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
            <div className="card" style={{'width': '18rem', 'textAlign': 'center' }}>
                <img
                  src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/my_computer.png" className="card-img-top"
                  alt=""
                  style={{'width': '130px', 'margin': 'auto'}}
                />
                {/* <i className="fa-solid fa-computer"></i> */}
                <div className="card-body">
                  <h5 className="card-title">Компьютеры</h5>
                  <h3 className="">{computerListTotalCount}</h3>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MainPage