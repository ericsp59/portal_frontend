import {Component} from 'react'

class AssetsList extends Component {

  state = {
    computerBtnIsCollapsed: true,
  }

  openAccordionItem = (func) => {
    func()
    this.setState(state => ({
      computerBtnIsCollapsed: !state.computerBtnIsCollapsed
    }))
  }

  render() {
    const {getAllComputersList, allComputerList, setSelectedComputerId, selectComputer} = this.props
    const elements = allComputerList.map(elem => {
      return (
        <li key={elem.id} style={{'listStyleType': 'none'}}>
          
          <p onClick={() => selectComputer(elem.id)}>
            <input
              type="checkbox"
              onChange={(e) => setSelectedComputerId(e.target.checked, elem.id)}
            /> {elem.id}: {elem.name}
          </p>
        </li>
      )
    })
    return (
    <>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              onClick={this.state.computerBtnIsCollapsed?
                () => this.openAccordionItem(getAllComputersList) : null}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >Компьютеры
            
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
                {/* <ul> */}
                  {elements}
                {/* </ul> */}
                
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Телефоны
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
            <div className="accordion-body">
            Телефоны list
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
              Сетевые устройства
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
            <div className="accordion-body">
            Сетевые устройства list
            </div>
          </div>
        </div>
      </div>
    </>  
    )
  }
}

export default AssetsList