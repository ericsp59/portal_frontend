import {Component} from 'react'
import Glpi10Service from '../../../services/glpi-10-service'
import AllComputersListItem from '../../all-computers-list-item/all-computers-list-item'


class InventoryPage extends Component {

  // constructor(props) {
  //   super(props)
  //   this.getCompInfoById(this.props.selectedComputer)
  // }

  // state = {
  //   selComputersInfoList: [],
  // }

  glpi10Service = new Glpi10Service()

  // getCompInfoById = (id) => {
  //   console.log('get')
  //   this.glpi10Service.getCompInfoById(id)
  //     .then(res => {
  //       const linksData = {}

  //       res.links.forEach(elem => {
  //         this.glpi10Service.getResFromLink(elem.href)
  //           .then(reslinksData => {
  //               res[elem.rel] = [reslinksData]
  //           })
  //       });
  //       // res['linksData'] = linksData
  //       // console.log(res)
  //       return res
  //     })
  //     .then(res => {
  //       this.setState(state => ({
  //         ...state,
  //         selComputersInfoList: [res]
  //       }))
  //     })
  // }

  componentDidMount(){
  }

  // componentDidUpdate(prevProps, prevState){
    
  //   if (prevProps !== this.props) {
  //   // if (prevState !== this.state) {
  //     // this.setState({
  //     //   selComputersInfoList: []
  //     // })

  //     // this.props.selectedComputerIds.forEach(element => {
  //     //   this.getCompInfoById(element)
  //     // });
  //     // console.log(this.props)
  //     // this.getCompInfoById(this.props.selectedComputer)
  //   }
  // }
  
  render() {
      const elements = this.props.selComputersInfoList.map(elem => {
        const {...itemProps} = elem
        return (
            
            <div className="allComputersListItem" key={elem.id}>
              <AllComputersListItem
                {...itemProps}
                linksData = {elem}
              /> 
            </div>
        )
      })
      
    return (
      <>
        {elements}
      </>
    )
  }
}  



export default InventoryPage