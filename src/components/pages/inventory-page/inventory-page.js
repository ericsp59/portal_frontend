import {Component} from 'react'
import Glpi10Service from '../../../services/glpi-10-service'
import AllComputersListItem from '../../all-computers-list-item/all-computers-list-item'


const InventoryPage = (props) => {
  const {selDeviceInfoList, selectedComputer, selectedPhone, selectedNteworkDev} = props


  // console.log(selDeviceInfoList)
  const elems = selDeviceInfoList.map(el => {
      let keyNames = []
      for (const keyName in el) {
        keyNames.push(keyName)
      }    
      let a = keyNames.map(x => {
        if (typeof(el[x]) == 'object'){
          let i = 0
          if (el[x] !== null){
            let values = el[x].map(value => {
              i ++
              return <span key={i}>{value}, </span>
            })
            
            return <p key={x}><b>{x}: </b>{values}</p>
          }

        }
        return <p key={x}><b>{x}: </b>{el[x]}</p>
      })
      return (
        <li key={el.id}>
          {a}
        </li>
      )
  });


  return(
    <>
      <h3>Inventory page</h3>
      {elems}
    </>
  )  
}


// class InventoryPage extends Component {
//   constructor(props) {
//     super(props)
//   }

//   state = {
//     selComputersInfoList: [],
//     computersInfoListIsLoaded: false,
//     ipAddresses: []
//   }

//   glpi10Service = new Glpi10Service()

//   getSerchComputerInfoById = (id) => {

//     this.glpi10Service.getSerchComputerInfoById(this.props.st, id, this.props.glpiAuthConfig)
//       .then(res => {
//         let arr = res.data.map(el => this.glpi10Service.renameObjKeys(el))
//         if (arr.length > 0) {
//           this.setState(state => ({
//             ...state,
//             selComputersInfoList: arr,
//             computersInfoListIsLoaded: true
//           }))
//         }

//       })
//   }
//   getSerchPhoneInfoById = (id) => {
//     this.glpi10Service.getSerchPhoneInfoById(this.props.st, id, this.props.glpiAuthConfig)
//       .then(res => {
//         let arr = res.data.map(el => this.glpi10Service.renameObjKeys(el))
//         if (arr.length > 0) {
//           this.setState(state => ({
//             ...state,
//             selComputersInfoList: arr,
//             computersInfoListIsLoaded: true
//           }))
//         }

//       })
//   }

//   componentDidMount(){
//   }

//   componentDidUpdate(prevProps, prevState){
//     if (prevProps.selectedComputer !== this.props.selectedComputer && this.props.selectedComputer !==0) {
//       this.getSerchComputerInfoById(this.props.selectedComputer)
//     }
//     if (prevProps.selectedPhone !== this.props.selectedPhone && this.props.selectedPhone !==0) {
//       this.getSerchPhoneInfoById(this.props.selectedPhone)
//     }
//   }
  
//   render() {
      
//       const elements = this.state.selComputersInfoList.map(elem => {
//         const {...itemProps} = elem
//         return (
//           <div className="allComputersListItem" key={elem.id}>
//             <AllComputersListItem
//               {...itemProps}
//               computersInfoListIsLoaded = {this.state.computersInfoListIsLoaded}
//             /> 
//           </div>

//         )
//       })
      
//     return (
      
//       <>
//         {this.state.computersInfoListIsLoaded ? elements : 'Select object'}
//       </>
//     )
//   }
// }  


export default InventoryPage