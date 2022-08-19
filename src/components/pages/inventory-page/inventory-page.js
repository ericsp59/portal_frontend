import {Component} from 'react'
import Glpi10Service from '../../../services/glpi-10-service'
import AllComputersListItem from '../../all-computers-list-item/all-computers-list-item'


class InventoryPage extends Component {

  constructor(props) {
    super(props)
    // this.getCompInfoById(this.props.selectedComputer)
  }

  state = {
    selComputersInfoList: [],
    computersInfoListIsLoaded: false,
    ipAddresses: []
  }

  glpi10Service = new Glpi10Service()

  // getCompInfoById = (id) => {
  //   // this.props.getComputerIpArr(id)
  //   //   .then(res => {
  //   //     this.setState(state => ({
  //   //       ...state,
  //   //       ipAddresses: res
  //   //     }))
  //   //   })  


  //   this.glpi10Service.getCompInfoById(id)
  //     .then(async res => {
  //       for (const elem of res.links) {
  //         await this.glpi10Service.getResFromLink(this.props.st, elem.href)
  //           .then(reslinksData => {
  //             // if (reslinksData.length > 0){
  //               // console.log(reslinksData)
  //               res[elem.rel] = [reslinksData]
  //             // } 
  //           })
  //       }
  //       // console.log(res)
  //       return res
  //     })
  //     .then(res => {
  //       // console.log(res)
  //       this.setState(state => ({
  //         ...state,
  //         selComputersInfoList: [res],
  //         computersInfoListIsLoaded: true
  //       }), () => console.log(this.state.selComputersInfoList))
  //     })
  // }

  getSerchComputerInfoById = (id) => {
    
    this.glpi10Service.getSerchComputerInfoById(this.props.st, id, this.props.glpiAuthConfig)
      .then(res => {
        let arr = res.data.map(el => this.glpi10Service.renameObjKeys(el))
        if (arr.length > 0) {
          // console.log(arr)
          // return arr
          this.setState(state => ({
            ...state,
            selComputersInfoList: arr,
            computersInfoListIsLoaded: true
          }))
        }

      })
  }

  componentDidMount(){
    // this.getSerchComputerInfoById(this.props.selectedComputer)
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.selectedComputer !== this.props.selectedComputer) {
      // this.getCompInfoById(this.props.selectedComputer)
      this.getSerchComputerInfoById(this.props.selectedComputer)
    }
  }
  
  render() {
      const elements = this.state.selComputersInfoList.map(elem => {
        const {...itemProps} = elem
        return (
          <div className="allComputersListItem" key={elem.id}>
            <AllComputersListItem
              {...itemProps}
              computersInfoListIsLoaded = {this.state.computersInfoListIsLoaded}
            /> 
          </div>

        )
      })
      
    return (
      <>
        {this.state.computersInfoListIsLoaded ? elements : 'LOADING'}
      </>
    )
  }
}  



export default InventoryPage