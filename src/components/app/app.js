import './app.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import AppInfo from '../app-info/app-info'
import MainNav from '../main-nav/main-nav';
import AssetsList from '../assets-list/assets-list'
import ErrorBoundary from '../error-boundary/error-boundary';
import SearchPanel from '../search-panel/search-panel';
import AWXService from '../../services/awx-service';
import Glpi10Service from '../../services/glpi-10-service'
import Error from '../error/error';
import MainPage from '../pages/main-page/main-page';
import AutomatizationPage from '../pages/automatization-page/automatization-page';
import InventoryPage from '../pages/inventory-page/inventory-page';
import TemplatesPage from '../pages/templates-page/templates-page';
import ReportsPage from '../pages/reports-page/reports-page';
import ControlPage from '../pages/control-page/control-page';
import ComputersInventoryPage from '../pages/computers-inventory-page/computers-inventory-page';
import PhonesInventoryPage from '../pages/phones-inventory-page/phones-inventory-page';
import NetworkInventoryPage from '../pages/network-inventory-page/network-inventory-page';




class App extends Component{
  // constructor(props){
  //   super(props)
  // }

  state = {
    glpiData: {
      selComputersInfoList: [],
      computerList: [],
      allComputerList: [],
      loadingComputerList: false,
      // selectedComputerItems:[],
      computerListTotalCount: 0,
      allComputerListTotalCount: 0,
    },
    awxData: {
      jobTemplateList: []
    },
    search: {
      searchString: ''
    },
    app: {
      selectedComputer: 1,
      selectedComputerIds: [],
      selectedTemplatesIds: [],
      loading: true,
      isError: false,
      loadMoreButtonIsDisabled: false,
      computersRangeFrom: 0,
      computersRangeTo: 40000,
      computersLoadCount: 10
    }
  }

 

  //////////////// checkbox computerListItem //////////////
  computerItemToggleCheck = (checked, ip) =>{  
    console.log(ip)  
    if (checked){
      const inventHostList = []
      this.awxService.getInvHostList()
        .then(res => {
          res.forEach(element => {
            inventHostList.push(element.name)
          });
          return res
        })
        .then((res) => {
          ip.forEach(hostIp => {
            if (!inventHostList.includes(hostIp)){
              this.awxService.addInventoryHostList(hostIp)
                .then(() => console.log(`${hostIp} Добавлен`))
            }
          });
        })
        .catch((e) => {
          console.log(e)
        })
    }

    else {
      const inventHostList = []
      this.awxService.getInvHostList()
        .then(res => {
          res.forEach(element => {
            inventHostList.push(element.name)
          });
          return res
        })
        .then((res) => {
          ip.forEach(hostIp => {
            if (inventHostList.includes(hostIp)){
              // this.awxService.addInventoryHostList('https://awx-debian11.local/api/v2/inventories/3/hosts/', hostIp)
              res.forEach(el => {
                if (el.name === hostIp) {
                  this.awxService.removeInventoryHost(el.id)
                    .then(() => console.log(`ID: ${el.id}: ${hostIp} удален`))
                }
              })
            }
          });
        })  
    }

  }

  ///////////////////////

  // Поиск
  changeSearchStr = (str) => {
    this.setState({
      search:{
        searchString: str  
      }  
    })
  }
  
  searchComp = (items, searchStr) => {
    if (searchStr.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
    })
  }
  ///////////

  // renameObjKeys = (obj) => {
  //   const voc = {
  //     1: 'name',
  //     2: 'id',
  //     5: 'serial',
  //     7: 'contact',
  //     19: 'date_mod',
  //     126: 'ipAddrArr',
  //     3: 'location'
  //   }

  //   for (const prop in obj){
  //     if (prop in voc){
  //       Object.defineProperty(obj, voc[prop],
  //         Object.getOwnPropertyDescriptor(obj, prop));
  //       delete obj[prop];
  //     }
  //   }
  //   return obj
  // }

  glpi10Service = new Glpi10Service()

  // getCompInfoById = (id) => {
  //   this.glpi10Service.getCompInfoById(id)
  //     .then(res => {
  //       // console.log(res)
  //       this.setState(state => ({
  //         glpiData: {
  //           ...state.glpiData,
  //           selComputersInfoList: [...state.glpiData.selComputersInfoList, res]
  //         }
  //       }))
  //     })
  // }
  // selComputersInfoList

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.app.selectedComputer !== this.state.app.selectedComputer) {
    //   this.getCompInfoById(this.state.app.selectedComputer)
    // }
    
  }


  selectComputer = (id) => {
    this.getCompInfoById(id)
    this.setState({
      app: {
        ...this.state.app,
        selectedComputer: id
      }
    }) 
    // 
  }

  getCompInfoById = async (id) => {
    this.glpi10Service.getCompInfoById(id)
      .then(res => {
        const linksData = {}

        res.links.forEach(elem => {
          this.glpi10Service.getResFromLink(elem.href)
            .then(reslinksData => {
                res[elem.rel] = [reslinksData]
            })
        });
        // res['linksData'] = linksData
        // console.log(res)
        return res
      })
      .then(res => {
        this.setState(state => ({
            glpiData: {
            ...state.glpiData,
            selComputersInfoList: [res]
            }
        }))
      })
  }

  getComputerIpArr = async (id) => {
    return await this.glpi10Service.getComputerIpArr(id)
    .then(res => {  // Фильтруем ip адреса
      res.forEach(el => {
        let ipAddrs = []
        if (typeof el.ipAddrArr === 'string') {
          el.ipAddrArr = [el.ipAddrArr]
        }
        el.ipAddrArr.forEach(ip => {
          if (ip !== '127.0.0.1' && ip.length > 7 && ip.length < 15 ) {
            ipAddrs.push(ip)
          }  
        });
        el.ipAddrArr = ipAddrs
      });
      return res.length > 0 ? res[0].ipAddrArr : ['']
      
    })
  }


  /////////////////////////////
//   const inventHostList = []
//   this.awxService.getInvHostList()
//     .then(res => {
//       res.forEach(element => {
//         inventHostList.push(element.name)
//       });
//       return res
//     })
//     .then((res) => {
//       ip.forEach(hostIp => {
//         if (!inventHostList.includes(hostIp)){
//           this.awxService.addInventoryHostList(hostIp)
//             .then(() => console.log(`${hostIp} Добавлен`))
//         }
//       });
//     })
//     .catch((e) => {
//       console.log(e)
//     })
// }

  //////////////////

  runTemplateonSelectedIds = () => {
    this.awxService.clearInventory()
      .then(async () => {
        const {selectedComputerIds, selectedTemplatesIds} = this.state.app
        // selectedComputerIds.forEach((elem) => {
          for (const elem of selectedComputerIds) {
            await this.getComputerIpArr(elem)
          // }
          // this.getComputerIpArr(elem)
            // .then(res => {
            //   res.forEach((ip) => {
            //     this.awxService.addInventoryHostList(ip)
            //     return ip
            //   })
            // })
            .then(async res => {
              for (const ip of res) {
                await this.awxService.addInventoryHostList(ip)
                return ip
              }
            })
            .then((ip) => {console.log('added: ', ip)})
        }
      })
      .then(() => {
        console.log('run temp', this.state.app.selectedTemplatesIds)
        console.log('on', this.state.app.selectedComputerIds)
      })
      // for (let i = 0; i < selectedComputerIds.length; i++) {
      //   const id = selectedComputerIds[i];
      //   this.getComputerIpArr(id)
      //   .then(res => {
      //     for (let i = 0; i < res.length; i++) {
      //       const ip = res[i];
      //       this.awxService.addInventoryHostList(ip)
            
      //     }
      //   })
      // }

  }

  setSelectedTemplateIds = (checked, id) => {
    if (checked) {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedTemplatesIds: [...state.app.selectedTemplatesIds, id]
        }
      }))
    }
    else {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedTemplatesIds: state.app.selectedTemplatesIds.filter(el => el !== id)
        }
      }))  
    }
  }
  

  setSelectedComputerId = (checked, id) => {
    if (checked) {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedComputerIds: [...state.app.selectedComputerIds, id]
        }
      }))
    }
    else {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedComputerIds: state.app.selectedComputerIds.filter(el => el !== id)
        }
      }))  
    }
  }

  getAllComputersList = () => {
    this.glpi10Service.getAllComputersList()
      .then(res => {
        this.setState(state => ({
          glpiData: {
            ...state.glpiData,
            allComputerList: [...state.glpiData.allComputerList, ...res.data],
            allComputerListTotalCount: res.contentTotalCount
          },
        }))
      })
  }

  loadMore = () => {
    const {computersRangeFrom, computersRangeTo} = this.state.app
    this.setState({
      app: {
        ...this.state.app,
        loading: true
      }
    })
    this.getAllComputers(computersRangeFrom, computersRangeTo)
  }


  // getAllComputers = (computersRangeFrom, computersRangeTo) => {
  //   const {computersLoadCount} = this.state.app.computersLoadCount
  //   if (computersRangeTo + computersLoadCount > this.state.glpiData.computerListTotalCount &&  this.state.glpiData.computerListTotalCount !== 0) {
  //     computersRangeTo = this.state.glpiData.computerListTotalCount
  //     this.setState({
  //       app: {
  //         ...this.state.app,
  //         loadMoreButtonIsDisabled: true
  //       }
  //     })
  //   }

  //   this.glpi10Service.getAllComputers(computersRangeFrom, computersRangeTo)
  //     .then(res => {
  //       this.setState(state => ({
  //         glpiData: {
  //           ...state.glpiData,
  //           computerListTotalCount: res.totalcount
  //         }
  //       }))
        
  //       for (let i = 0; i < res.data.length; i++) {
  //         const element = res.data[i];
  //         this.renameObjKeys(element)
  //       }
  //       return res.data
  //     })
      // .then(res => {  // Фильтруем ip адреса
      //   res.forEach(el => {
      //     let ipAddrs = []
      //     if (typeof el.ipAddrArr === 'string') {
      //       el.ipAddrArr = [el.ipAddrArr]
      //     }
      //     el.ipAddrArr.forEach(ip => {
      //       if (ip !== '127.0.0.1' && ip.length > 7 && ip.length <= 15 ) {
      //         ipAddrs.push(ip)
      //       }  
      //     });
      //     el.ipAddrArr = ipAddrs
      //   });
      //   return res
      // })
  //     .then(res => {
  //       // console.log(res)
  //       this.setState(state => ({
  //         glpiData: {
  //           ...state.glpiData,
  //           computerList: [...state.glpiData.computerList, ...res ],
  //         },
  //         app: {
  //           ...state.app,
  //           loading: false,
  //           computersRangeFrom: computersRangeTo,
  //           computersRangeTo: computersRangeTo + computersLoadCount
  //         }
  //       }))
  //     })
  //     .catch((e) => {
  //       this.setState((state) => ({
  //         app: {
  //           ...state.app,
  //           isError: true
  //         }
  //       }))
  //     })
  // }

  awxService = new AWXService();
  getJobTemplateList = () => { 
    this.awxService.getJobTemplateList()
      .then(res => {
        // console.log(res.results.filter(el => el.inventory === 3))
        this.setState(state => ({
            awxData:{
              jobTemplateList: res.results.filter(el => el.inventory === 3)
            } 
          }
        ))
      })
  }

  componentDidMount() {
  
    const {computersRangeFrom, computersRangeTo} = this.state.app
    // this.getAllComputers(computersRangeFrom, computersRangeTo)
    this.getJobTemplateList()
    // this.awxService.clearInventory()
  }


  render() {

    const {loading, isError, selectedTemplatesIds,selectedComputerIds,selectedComputer} = this.state.app
    const {searchString} = this.state.search
    const {computerList, allComputerList, allComputerListTotalCount, selComputersInfoList} = this.state.glpiData
    const visibleComputerList = this.searchComp(computerList, searchString)
    const {jobTemplateList} = this.state.awxData
    
    return (
      
      <Router>
        <div className="app">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <AppInfo/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <SearchPanel
                  searchString = {searchString}
                  changeSearchStr = {this.changeSearchStr}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <MainNav/>
              </div>
            </div> 

            <div className="row"> 
              <div className="col-sm-2">
                <AssetsList
                  getAllComputersList={this.getAllComputersList}
                  allComputerList={allComputerList}
                  setSelectedComputerId={this.setSelectedComputerId}
                  selectComputer = {this.selectComputer}
                />
              </div> 

              <div className="col-sm-10">
                <Switch>

                  <Route exact path={'/'}>
                    <MainPage
                      allComputerListTotalCount={allComputerListTotalCount}
                    />
                  </Route>

                  <Route exact path={'/automatization-page'}>

                    <ErrorBoundary>
                      <AutomatizationPage
                        // computerList = {visibleComputerList}
                        selectedComputerIds = {selectedComputerIds}
                        setSelectedTemplateIds = {this.setSelectedTemplateIds}
                        jobTemplateList = {jobTemplateList}
                        selectedTemplatesIds = {selectedTemplatesIds}
                        runTemplateonSelectedIds = {this.runTemplateonSelectedIds}
                        // computerItemToggleCheck = {this.computerItemToggleCheck}
                        // loadMore = {this.loadMore}
                        // loadMoreButtonIsDisabled = {loadMoreButtonIsDisabled}
                      />
                    </ErrorBoundary>
                  </Route>

                  <Route exact path='/inventory-page'>
                    <InventoryPage
                      // selectedComputerIds = {selectedComputerIds}
                      selectedComputer = {selectedComputer}
                      selComputersInfoList = {selComputersInfoList}
                    />
                  </Route>

                  <Route exact path='/computers-inventory-page'>
                    <ComputersInventoryPage/>
                  </Route>

                  <Route exact path='/phones-inventory-page'>
                    <PhonesInventoryPage/>
                  </Route>

                  <Route exact path='/network-inventory-page'>
                    <NetworkInventoryPage/>
                  </Route>

                  <Route exact path='/inventory-page'>
                    <InventoryPage/>
                  </Route>

                  <Route exact path='/templates-page'>
                    <TemplatesPage
                      jobTemplateList = {jobTemplateList}
                    />
                  </Route>

                  <Route exact path='/reports-page'>
                    <ReportsPage/>
                  </Route>

                  <Route exact path='/control-page'>
                    <ControlPage/>
                  </Route>

                </Switch>
              </div>
            </div>
            <div className="row">
    
            </div>
          </div>
          
        </div>
      </Router>
    );
  
  }


}

export default App;