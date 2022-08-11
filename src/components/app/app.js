import './app.css'
// import state from '../../red/state';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import AppInfo from '../app-info/app-info'
import MainNav from '../main-nav/main-nav';
import AssetsList from '../assets-list/assets-list'
import ErrorBoundary from '../error-boundary/error-boundary';
import SearchPanel from '../search-panel/search-panel';
import DjangoPortalService from '../../services/django_portal_service';
import SemaforeService from '../../services/semaphore-service';
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
  
  state = this.props.state

 
  initGlpiSession = () => {
    this.glpi10Service.getGlpiSessionToken()
      .then(res => {
        this.setState({
          app: {
            ...this.state.app,
            glpiSessionToken: res
          }
        })
      })
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

  djangoPortalService = new DjangoPortalService()

  changeInputNewTemplateName = (templateName) => {
    this.setState({
      app: {
        ...this.state.app,
        newTemplateName: templateName
      }
    })
  }

  changeSelectedPlaybookFile = (file) => {
    // console.log(file)
    this.setState({
      app: {
        ...this.state.app,
        selectedPlaybookFile: file
      }
    })
  }

  addPlaybookHandler = () => {
    this.djangoPortalService.addPlaybookFileToGit(this.state.app.selectedPlaybookFile)
     .then(res => {
      if (res.post == 'ok'){
        this.semaforeService.createSemaphoreTemplate(this.state.app.newTemplateName, res.name)
          .then(res => {
            this.getSemaforeTemplateList()
            // console.log(res)
          })
      }
      // console.log(res)
      // console.log(this.state.app)
     })
  }

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
    this.glpi10Service.getCompInfoById(this.state.app.glpiSessionToken, id)
      .then(res => {
        const linksData = {}

        res.links.forEach(elem => {
          this.glpi10Service.getResFromLink(this.state.app.glpiSessionToken, elem.href)
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
    return await this.glpi10Service.getComputerIpArr(this.state.app.glpiSessionToken,id)
    .then(res => {  // Фильтруем ip адреса
      if (res) 
      {
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
      // console.log(`getComputerIpArr - ${res}`)
      return res.length > 0 ? res[0].ipAddrArr : ['']
    }
      
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

  runSemaphoreTemplate = async () => {
    const {selectedComputerIds, selectedTemplatesIds, selectedKeysIds} = this.state.app
    // console.log(selectedComputerIds, selectedTemplatesIds)
    let ipString = ''
    for (const elem of selectedComputerIds) {
      // console.log(elem)
      await this.getComputerIpArr(elem)
        .then(async res => {
          for (const ip of res) {
            ipString += `${ip}\n`
          }
        })

    }
    this.semaforeService.updateSemaphoreInventory(this.state.app.semaphoreSessionToken, this.state.app.glpiInventory, ipString, selectedKeysIds)
      .then(async (res) => {
        if (res.ok) {
          // console.log('run template', selectedTemplatesIds)
          for (const id of selectedTemplatesIds) {
            
            await this.semaforeService.runSemaphoreTemplate(this.state.app.semaphoreSessionToken, id)
              .then(x => {
                // console.log(x)
                // console.log(selectedKeysIds)
                this.djangoPortalService.addRunTemplateJobToLogs(id, selectedKeysIds)
                console.log(selectedKeysIds, id)
              })
          }
        }
      })
  }

  // runTemplateonSelectedIds = () => {
  //   this.awxService.clearInventory()
  //     .then(async () => {
  //       const {selectedComputerIds, selectedTemplatesIds} = this.state.app
  //       // selectedComputerIds.forEach((elem) => {
  //         for (const elem of selectedComputerIds) {
  //           await this.getComputerIpArr(elem)
  //             .then(async res => {
  //               for (const ip of res) {
  //                 await this.awxService.addInventoryHostList(ip)
  //                 return ip
  //               }
  //             })
  //             .then((ip) => {console.log('added: ', ip)})
  //       }
  //     })
  //     .then(() => {
  //       if (this.state.app.selectedTemplatesIds !== []) {
  //         this.state.app.selectedTemplatesIds.forEach(templateId => {
  //           // console.log(templateId)
  //           this.awxService.launchJobTemplate(templateId)
  //         }) 
  //       }

  //       console.log('on', this.state.app.selectedComputerIds)
  //     })
  // }

  setSelectedKeysIds = (checked, id) => {
    console.log(`keys: ${id}`)
    if (checked) {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedKeysIds: id
        }
      }))
    }
    // else {
    //   this.setState(state => ({
    //     app: {
    //       ...this.state.app,
    //       selectedKeysIds: ''
    //     }
    //   }))  
    // }    
  }

  setSelectedTemplateIds = (checked, id) => {
    console.log(`template: ${id}`)
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
    this.glpi10Service.getAllComputersList(this.state.app.glpiSessionToken)
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


  semaforeService = new SemaforeService();

  semaforeLogin = async () => {
    let result = await this.semaforeService.login()
      .then(async (res) => {
        if (res.ok) {
          let st = await this.semaforeService.getSemaphoreUserTokens(this.state.app.semaphoreSessionToken)
            .then(async res => {
              let i = -1
              for (let k = 0; k < res.length; k++) {
                let token = res[k]          
                if (!token.expired) {
                  i = k
                  break
                }
              }
              if (i !== -1) {
                return (res[i].id)        
              }
              else {
                await this.semaforeService.createSemaphoreApiToken()
                  .then(res => {
                    return res.id
                  })
              }  
            })
            return st
        }
        else {
          console.log('login bad')
        }
        
      })
      .then(st => {
        this.setState({
          app: {
            ...this.state.app,
            semaphoreSessionToken: st
          }
        })
        return st
      })
      return result
  }

  getSemaphoreKeysList = async () => {
    this.semaforeService.getSemaphoreKeys()
      .then(res => {
        this.setState({
          SemaphoreData: {
            ...this.state.SemaphoreData,
            keysList: res
          }
        })
      })
  }

  deleteSemaphoreTemplate = (id) => {
    this.semaforeService.deleteSemaphoreTemplate(id)
      .then(res => {
        console.log(res)
        this.getSemaforeTemplateList()
      })
  }

  getSemaforeTemplateList = (res) => {
    this.semaforeService.getSemaphoreTemplates(res)
    .then(res => {
      // console.log(res.results.filter(el => el.inventory === 3))
      this.setState(state => ({
          SemaphoreData:{
            ...this.state.SemaphoreData,
            jobTemplateList: res
          } 
        }
      ))
    })
  }

  getSemaphoreInventory = (st) => {
    this.semaforeService.getSemaphoreInventory(st)
      .then(res => {
        if (res != []) {
          // console.log(res.filter(el => el.name === 'portal_inventory')[0])
          this.setState({
            app: {
              ...this.state.app,
              glpiInventory: res.filter(el => el.name === 'portal_inventory')[0]
            }
          })
        }
      })
  }

  // awxService = new AWXService();
  // getJobTemplateList = () => { 
  //   this.awxService.getJobTemplateList()
  //     .then(res => {
  //       // console.log(res.results.filter(el => el.inventory === 3))
  //       this.setState(state => ({
  //           awxData:{
  //             jobTemplateList: res.results.filter(el => el.inventory === 3)
  //           } 
  //         }
  //       ))
  //     })
  // }

  loginAndGetTemplates = async () => {
    this.semaforeLogin()
      .then((res) => {
        console.log(res)
        // this.getSemaforeTemplateList()
      })
  }

  componentDidMount() {
    this.initGlpiSession()
    this.semaforeLogin()
      .then((res) => {
        this.getSemaforeTemplateList(res)
        this.getSemaphoreKeysList(res)
        this.getSemaphoreInventory(res)
      })
    
    // this.loginAndGetTemplates()

    
  }


  render() {
    const {loading, isError, selectedTemplatesIds,selectedComputerIds,selectedComputer, glpiSessionToken, newTemplateName, baseDir} = this.state.app
    const {searchString} = this.state.search
    const {computerList, allComputerList, allComputerListTotalCount, selComputersInfoList} = this.state.glpiData
    const visibleComputerList = this.searchComp(computerList, searchString)
    const {jobTemplateList, keysList} = this.state.SemaphoreData

    
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
                <MainNav baseDir={baseDir}/>
              </div>
            </div> 

            <div className="row"> 
              <div className="col-sm-2">
                <AssetsList
                  getAllComputersList={this.getAllComputersList}
                  allComputerList={this.searchComp(allComputerList, searchString)}
                  // allComputerList={allComputerList}
                  setSelectedComputerId={this.setSelectedComputerId}
                  selectComputer = {this.selectComputer}
                />
              </div> 

              <div className="col-sm-10">
                <Switch>

                  <Route exact path={baseDir}>
                    <MainPage
                      allComputerListTotalCount={allComputerListTotalCount}
                    />
                  </Route>

                  <Route exact path={`${baseDir}automatization-page`}>

                    <ErrorBoundary>
                      <AutomatizationPage
                        keysList = {keysList}
                        selectedComputerIds = {selectedComputerIds}
                        setSelectedTemplateIds = {this.setSelectedTemplateIds}
                        setSelectedKeysIds = {this.setSelectedKeysIds} 
                        jobTemplateList = {jobTemplateList}
                        selectedTemplatesIds = {selectedTemplatesIds}
                        runSemaphoreTemplate = {this.runSemaphoreTemplate}
                        semaforeLogin = {this.semaforeLogin}
                      />
                    </ErrorBoundary>
                  </Route>

                  <Route exact path={`${baseDir}inventory-page`}>
                    <InventoryPage
                      // selectedComputerIds = {selectedComputerIds}
                      selectedComputer = {selectedComputer}
                      selComputersInfoList = {selComputersInfoList}
                      getComputerIpArr = {this.getComputerIpArr}
                      st = {glpiSessionToken}
                    />
                  </Route>

                  <Route exact path={`${baseDir}computers-inventory-page`}>
                    <ComputersInventoryPage/>
                  </Route>

                  <Route exact path={`${baseDir}phones-inventory-page`}>
                    <PhonesInventoryPage/>
                  </Route>

                  <Route exact path={`${baseDir}network-inventory-page`}>
                    <NetworkInventoryPage/>
                  </Route>

                  <Route exact path={`${baseDir}inventory-page`}>
                    <InventoryPage/>
                  </Route>

                  <Route exact path={`${baseDir}templates-page`}>
                    <TemplatesPage
                      jobTemplateList = {jobTemplateList}
                      addPlaybookHandler = {this.addPlaybookHandler}
                      changeSelectedPlaybookFile = {this.changeSelectedPlaybookFile}
                      deleteTemplate = {this.deleteSemaphoreTemplate}
                      newTemplateName = {newTemplateName}
                      changeInputNewTemplateName = {this.changeInputNewTemplateName}
                    />
                  </Route>

                  <Route exact path={`${baseDir}reports-page`}>
                    <ReportsPage/>
                  </Route>

                  <Route exact path={`${baseDir}control-page`}>
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