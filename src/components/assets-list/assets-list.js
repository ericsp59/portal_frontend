import {Component} from 'react'

class AssetsList extends Component {

  state = {
    computerBtnIsCollapsed: true,
    PhoneBtnIsCollapsed: true,
    networkDevBtnIsCollapsed: true,
  }

  openAccordionItem = (func, type) => {
    func()
    if (type=="Phones") {
      this.setState(state => ({
        PhoneBtnIsCollapsed: !state.PhoneBtnIsCollapsed,
      }))
    }
    else if (type == 'Computers'){
      this.setState(state => ({
        computerBtnIsCollapsed: !state.computerBtnIsCollapsed
      }))      
    }

    else if (type == 'NetworkDev'){
      this.setState(state => ({
        networkDevBtnIsCollapsed: !state.networkDevBtnIsCollapsed
      }))      
    }

  }

  render() {
    const {getAllNetworkDevList, getAllComputersList, getAllPhonesList, selectNetworkDev, selectPhone, selectComputer,allNetworkDevList, allComputerList, allPhonesList, setSelectedComputerId, setSelectedPhoneId} = this.props

    const elementsComputers = allComputerList.map(elem => {
      return (
        <li key={elem.id} style={{'listStyleType': 'none'}}>
          
          
            <input
              type="checkbox"
              onChange={(e) => setSelectedComputerId(e.target.checked, elem.id)}
            />
            <p style={{'display': 'inline-block', 'marginLeft': '5px'}}
              onClick={() => selectComputer(elem.id)}
            >{elem.id}: {elem.name}</p> 
          
        </li>
      )
    })
    const elementsPhones = allPhonesList.map(elem => {
      return (
        <li key={elem.id} style={{'listStyleType': 'none'}}>
          <input
              type="checkbox"
              onChange={(e) => setSelectedPhoneId(e.target.checked, elem.id)}
          /> 

          <p style={{'display': 'inline-block', 'marginLeft': '5px'}} 
            onClick={() => selectPhone(elem.id)}
          >{elem.id}: {elem.name}  
          </p>    
          
        </li>
      )
    })

    const elementsNetworkDev = allNetworkDevList.map(elem => {
      return (
        <li key={elem.id} style={{'listStyleType': 'none'}}>
          <input
              type="checkbox"
              onChange={(e) => setSelectedPhoneId(e.target.checked, elem.id)}
          /> 

          <p style={{'display': 'inline-block', 'marginLeft': '5px'}} 
            onClick={() => selectNetworkDev(elem.id)}
          >{elem.id}: {elem.name}  
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
                () => this.openAccordionItem(getAllComputersList, 'Computers') : null}
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
                  {elementsComputers}          
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              onClick={this.state.PhoneBtnIsCollapsed?
                () => this.openAccordionItem(getAllPhonesList, 'Phones') : null}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseTwo"
            >Телефоны
            
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
            <div className="accordion-body">
                  {elementsPhones}          
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              onClick={this.state.networkDevBtnIsCollapsed?
                () => this.openAccordionItem(getAllNetworkDevList, 'NetworkDev') : null}
              className="accordion-button collapsed"
              type="button" data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false" 
              aria-controls="panelsStayOpen-collapseThree"
              
              >
              Сетевые устройства
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
            <div className="accordion-body">
                {elementsNetworkDev}
            </div>
          </div>
        </div>
      </div>
    </>  
    )
  }
}

export default AssetsList