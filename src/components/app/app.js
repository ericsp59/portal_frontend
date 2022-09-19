import './app.css'
// import state from '../../red/state';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom' 
import { Component, useContext, useCallback, useState, useEffect } from 'react';
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
import NotesPage from '../pages/notes-page/notes-page';
import ControlPage from '../pages/control-page/control-page';
import ComputersInventoryPage from '../pages/computers-inventory-page/computers-inventory-page';
import PhonesInventoryPage from '../pages/phones-inventory-page/phones-inventory-page';
import NetworkInventoryPage from '../pages/network-inventory-page/network-inventory-page';
// import Login from '../login/login';
import AuthContext from '../../red/auth-context';


class App extends Component {
  
  static contextType = AuthContext


  state = this.props.state

  glpi10Service = new Glpi10Service()

  

  initGlpiSession = (glpiAuthConfig) => {
    this.glpi10Service.getGlpiSessionToken(glpiAuthConfig)
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
        this.semaforeService.createSemaphoreTemplate(this.state.SemaphoreData.semaphoreAuthConfig, this.state.app.newTemplateName, res.name)
          .then(res => {
            this.getSemaforeTemplateList(this.state.SemaphoreData.semaphoreAuthConfig)
            // console.log(res)
          })
      }
      // console.log(res)
      // console.log(this.state.app)
     })
  }

  


  selectComputer = (id) => {
    this.getCompInfoById(id)
    this.setState({
      app: {
        ...this.state.app,
        selectedComputer: id,
        selectedNteworkDev: 0,
        selectedPhone: 0
      }
    }) 
    // 
  }
  selectPhone = (id) => {
    this.getPhoneInfoById(id)
    this.setState({
      app: {
        ...this.state.app,
        selectedPhone: id,
        selectedComputer: 0,
        selectedNteworkDev: 0,        
      }
    }) 
    // 
  }



  getPhoneInfoById = async (id) => {
    this.glpi10Service.getPhoneInfoById(this.state.app.glpiSessionToken, id, this.state.glpiData.glpiAuthConfig)
      .then(res => {
        res.links.forEach(elem => {
          this.glpi10Service.getResFromLink(this.state.app.glpiSessionToken, elem.href, this.state.glpiData.glpiAuthConfig)
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
            selPhonesInfoList: [res]
            }
        }))
      })
  }
  getCompInfoById = async (id) => {
    this.glpi10Service.getCompInfoById(this.state.app.glpiSessionToken, id, this.state.glpiData.glpiAuthConfig)
      .then(res => {
        res.links.forEach(elem => {
          this.glpi10Service.getResFromLink(this.state.app.glpiSessionToken, elem.href, this.state.glpiData.glpiAuthConfig)
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
    return await this.glpi10Service.getComputerIpArr(this.state.app.glpiSessionToken,id, this.state.glpiData.glpiAuthConfig)
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
    this.semaforeService.updateSemaphoreInventory(this.state.SemaphoreData.semaphoreAuthConfig, this.state.app.glpiInventory, ipString, selectedKeysIds)
      .then(async (res) => {
        if (res.ok) {
          // console.log('run template', selectedTemplatesIds)
          for (const id of selectedTemplatesIds) {
            
            await this.semaforeService.runSemaphoreTemplate(this.state.SemaphoreData.semaphoreAuthConfig, id)
              .then(x => {
                
                // console.log(selectedKeysIds)
                this.djangoPortalService.addRunTemplateJobToLogs(id, selectedKeysIds)
                console.log(selectedKeysIds, id)
              })
          }
        }
      })
  }

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
  

  setSelectedPhoneId = (checked, id) => {
    if (checked) {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedPhoneIds: [...state.app.selectedPhoneIds, id]
        }
      }))
    }
    else {
      this.setState(state => ({
        app: {
          ...this.state.app,
          selectedPhoneIds: state.app.selectedPhoneIds.filter(el => el !== id)
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
    this.glpi10Service.getAllComputersList(this.state.app.glpiSessionToken, this.state.glpiData.glpiAuthConfig)
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
  getAllPhonesList = () => {
    this.glpi10Service.getAllPhonesList(this.state.app.glpiSessionToken, this.state.glpiData.glpiAuthConfig)
      .then(res => {
        this.setState(state => ({
          glpiData: {
            ...state.glpiData,
            allPhonesList: [...state.glpiData.allPhonesList, ...res.data],
            allPhonesListTotalCount: res.contentTotalCount
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

  semaforeLogin = async (res) => {
    const semaforeAuthConfig = res
    let result = await this.semaforeService.login(semaforeAuthConfig)
      // .then(async (res) => {
      //   if (res.ok) {
      //     let st = await this.semaforeService.getSemaphoreUserTokens(semaforeAuthConfig)
      //       .then(async res => {
      //         let i = -1
      //         for (let k = 0; k < res.length; k++) {
      //           let token = res[k]          
      //           if (!token.expired) {
      //             i = k
      //             break
      //           }
      //         }
      //         if (i !== -1) {
      //           return (res[i].id)        
      //         }
      //         else {
      //           await this.semaforeService.createSemaphoreApiToken(semaforeAuthConfig)
      //             .then(res => {
      //               return res.id
      //             })
      //         }  
      //       })
      //       return st
      //   }
      //   else {
      //     console.log('login bad')
      //   }
        
      // })
      // .then(st => {
      //   this.setState({
      //     app: {
      //       ...this.state.app,
      //       semaphoreSessionToken: st
      //     }
      //   })
      //   return st
      // })
      return semaforeAuthConfig
  }

  getSemaphoreTaskOutput = async (id) => {
    let res = await this.semaforeService.getSemaphoreTaskOutput(this.state.SemaphoreData.semaphoreAuthConfig, id)
    return res
  }

  getSemaphoreTasks = async () => {
    let res = await this.semaforeService.getSemaphoreTasks(this.state.SemaphoreData.semaphoreAuthConfig)
    return res
  }

  getSemaphoreKeysList = async (res) => {
    this.semaforeService.getSemaphoreKeys(res)
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
    this.semaforeService.deleteSemaphoreTemplate(this.state.SemaphoreData.semaphoreAuthConfig, id)
      .then(res => {
        this.getSemaforeTemplateList(this.state.SemaphoreData.semaphoreAuthConfig)
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

  getSemaphoreInventory = (semaphoreConfig) => {
    this.semaforeService.getSemaphoreInventory(semaphoreConfig)
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

  // loginAndGetTemplates = async () => {
  //   this.semaforeLogin()
  //     .then((res) => {
  //       console.log(res)
  //       // this.getSemaforeTemplateList()
  //     })
  // }

  componentDidMount() {
    
    this.glpi10Service.getGlpiConfig()
      .then(res => {
        this.setState({
          glpiData: {
            ...this.state.glpiData,
            glpiAuthConfig: res
          }
        })
        return res
      })
      .then(res => {
        this.initGlpiSession(res)

    this.semaforeService.getSemaphoreConfig()
      .then(res => {
        this.setState({
          SemaphoreData: {
            ...this.state.SemaphoreData,
            semaphoreAuthConfig: res
          }
        })
        return res
      })
      .then(res => {
        this.semaforeLogin(res)
        .then((res) => {
          this.getSemaforeTemplateList(res)
          this.getSemaphoreKeysList(res)
          this.getSemaphoreInventory(res)
  
        })
      })
    }) 

    
    // this.loginAndGetTemplates()
  }

  getDjangoNotes = async () => {
    // console.log(this.context)
    this.djangoPortalService.getNotes(this.context.authTokens.access)
      .then(async res => {
        if (res.status === 200) {
          let data = await res.json()
          this.setState({
            djangoBackendData: {
              ...this.state.djangoBackendData,
              notes: data  
            }
          })
        }
        else if (res.statusText === 'Unauthorized') {
          this.context.djangoLogoutUser()
        }
      })
  }

  render() {

    // const user = this.context
    // console.log(user)

    const {loading, isError, selectedTemplatesIds,selectedComputerIds,selectedComputer,selectedPhone, glpiSessionToken, newTemplateName, baseDir} = this.state.app
    const {searchString} = this.state.search
    const {computerList, allPhonesList, allPhonesListTotalCount, allComputerList, allComputerListTotalCount, selComputersInfoList, selPhonesInfoList, glpiAuthConfig} = this.state.glpiData
    const visibleComputerList = this.searchComp(computerList, searchString)
    const {jobTemplateList, keysList} = this.state.SemaphoreData
    const {notes} = this.state.djangoBackendData

    
    return (
      <>
      <Router>
        <div className="app">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <AppInfo/>
                {this.context.user ? (<Link to='/logout' onClick={this.context.djangoLogoutUser}>Выйти</Link>) : (<Link to='/login'>Войти</Link>)}
                <h4>Hello, {this.context.user}!</h4>
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
                  getAllPhonesList={this.getAllPhonesList}
                  allComputerList={this.searchComp(allComputerList, searchString)}
                  allPhonesList={this.searchComp(allPhonesList, searchString)}
                  // allComputerList={allComputerList}
                  setSelectedComputerId={this.setSelectedComputerId}
                  setSelectedPhoneId={this.setSelectedPhoneId}
                  selectComputer = {this.selectComputer}
                  selectPhone = {this.selectPhone}
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
                        getSemaphoreTasks = {this.getSemaphoreTasks}
                        getSemaphoreTaskOutput = {this.getSemaphoreTaskOutput}
                      />
                    </ErrorBoundary>
                  </Route>

                  <Route exact path={`${baseDir}inventory-page`}>
                    <InventoryPage
                      // selectedComputerIds = {selectedComputerIds}
                      selectedComputer = {selectedComputer}
                      selectedPhone = {selectedPhone}
                      selComputersInfoList = {selComputersInfoList}
                      selPhonesInfoList = {selPhonesInfoList}
                      getComputerIpArr = {this.getComputerIpArr}
                      st = {glpiSessionToken}
                      glpiAuthConfig = {glpiAuthConfig}
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

                  <Route exact path={`${baseDir}notes-page`}>
                    <NotesPage
                      notes = {notes}
                      // context = {user}
                      getDjangoNotes = {this.getDjangoNotes}
                    />
                  </Route>

                </Switch>
              </div>
            </div>
            <div className="row">
    
            </div>
          </div>
          
        </div>
      </Router>
      </>
    );
  
  }

}




 // #########################################

//  function App(props) {
//   // console.log(props)
  
//   const state = props.state

//   const initGlpiSession = () => {
//     glpi10Service.getGlpiSessionToken()
//       .then(res => {
//         this.setState({
//           app: {
//             ...state.app,
//             glpiSessionToken: res
//           }
//         })
//       })
//   }

//   //////////////// checkbox computerListItem //////////////
//   // const computerItemToggleCheck = (checked, ip) =>{  
//   //   console.log(ip)  
//   //   if (checked){
//   //     const inventHostList = []
//   //     this.awxService.getInvHostList()
//   //       .then(res => {
//   //         res.forEach(element => {
//   //           inventHostList.push(element.name)
//   //         });
//   //         return res
//   //       })
//   //       .then((res) => {
//   //         ip.forEach(hostIp => {
//   //           if (!inventHostList.includes(hostIp)){
//   //             this.awxService.addInventoryHostList(hostIp)
//   //               .then(() => console.log(`${hostIp} Добавлен`))
//   //           }
//   //         });
//   //       })
//   //       .catch((e) => {
//   //         console.log(e)
//   //       })
//   //   }

//   //   else {
//   //     const inventHostList = []
//   //     this.awxService.getInvHostList()
//   //       .then(res => {
//   //         res.forEach(element => {
//   //           inventHostList.push(element.name)
//   //         });
//   //         return res
//   //       })
//   //       .then((res) => {
//   //         ip.forEach(hostIp => {
//   //           if (inventHostList.includes(hostIp)){
//   //             // this.awxService.addInventoryHostList('https://awx-debian11.local/api/v2/inventories/3/hosts/', hostIp)
//   //             res.forEach(el => {
//   //               if (el.name === hostIp) {
//   //                 this.awxService.removeInventoryHost(el.id)
//   //                   .then(() => console.log(`ID: ${el.id}: ${hostIp} удален`))
//   //               }
//   //             })
//   //           }
//   //         });
//   //       })  
//   //   }

//   // }

//   ///////////////////////

//   // Поиск
//   const changeSearchStr = (str) => {
//     this.setState({
//       search:{
//         searchString: str  
//       }  
//     })
//   }
  
//   const searchComp = (items, searchStr) => {
//     if (searchStr.length === 0) {
//       return items
//     }

//     return items.filter(item => {
//       return item.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
//     })
//   }

//   const djangoPortalService = new DjangoPortalService()

//   const changeInputNewTemplateName = (templateName) => {
//     this.setState({
//       app: {
//         ...this.state.app,
//         newTemplateName: templateName
//       }
//     })
//   }

//   const changeSelectedPlaybookFile = (file) => {
//     // console.log(file)
//     this.setState({
//       app: {
//         ...this.state.app,
//         selectedPlaybookFile: file
//       }
//     })
//   }

//   const addPlaybookHandler = () => {
//     this.djangoPortalService.addPlaybookFileToGit(this.state.app.selectedPlaybookFile)
//      .then(res => {
//       if (res.post == 'ok'){
//         this.semaforeService.createSemaphoreTemplate(this.state.app.newTemplateName, res.name)
//           .then(res => {
//             this.getSemaforeTemplateList()
//             // console.log(res)
//           })
//       }
//       // console.log(res)
//       // console.log(this.state.app)
//      })
//   }

//   const glpi10Service = new Glpi10Service()


//   const selectComputer = (id) => {
//     this.getCompInfoById(id)
//     this.setState({
//       app: {
//         ...this.state.app,
//         selectedComputer: id
//       }
//     }) 
//     // 
//   }

//   const getCompInfoById = async (id) => {
//     this.glpi10Service.getCompInfoById(this.state.app.glpiSessionToken, id)
//       .then(res => {
//         const linksData = {}

//         res.links.forEach(elem => {
//           this.glpi10Service.getResFromLink(this.state.app.glpiSessionToken, elem.href)
//             .then(reslinksData => {
//                 res[elem.rel] = [reslinksData]
//             })
//         });
//         // res['linksData'] = linksData
//         // console.log(res)
//         return res
//       })
//       .then(res => {
//         this.setState(state => ({
//             glpiData: {
//             ...state.glpiData,
//             selComputersInfoList: [res]
//             }
//         }))
//       })
//   }

//   const getComputerIpArr = async (id) => {
//     return await this.glpi10Service.getComputerIpArr(this.state.app.glpiSessionToken,id)
//     .then(res => {  // Фильтруем ip адреса
//       if (res) 
//       {
//       res.forEach(el => {
//         let ipAddrs = []
//         if (typeof el.ipAddrArr === 'string') {
//           el.ipAddrArr = [el.ipAddrArr]
//         }
//         el.ipAddrArr.forEach(ip => {
//           if (ip !== '127.0.0.1' && ip.length > 7 && ip.length < 15 ) {
//             ipAddrs.push(ip)
//           }  
//         });
//         el.ipAddrArr = ipAddrs
//       });
//       // console.log(`getComputerIpArr - ${res}`)
//       return res.length > 0 ? res[0].ipAddrArr : ['']
//     }
      
//     })
//   }

//   const runSemaphoreTemplate = async () => {
//     const {selectedComputerIds, selectedTemplatesIds, selectedKeysIds} = this.state.app
//     // console.log(selectedComputerIds, selectedTemplatesIds)
//     let ipString = ''
//     for (const elem of selectedComputerIds) {
//       // console.log(elem)
//       await this.getComputerIpArr(elem)
//         .then(async res => {
//           for (const ip of res) {
//             ipString += `${ip}\n`
//           }
//         })

//     }
//     this.semaforeService.updateSemaphoreInventory(this.state.app.semaphoreSessionToken, this.state.app.glpiInventory, ipString, selectedKeysIds)
//       .then(async (res) => {
//         if (res.ok) {
//           // console.log('run template', selectedTemplatesIds)
//           for (const id of selectedTemplatesIds) {
            
//             await this.semaforeService.runSemaphoreTemplate(this.state.app.semaphoreSessionToken, id)
//               .then(x => {
//                 // console.log(x)
//                 // console.log(selectedKeysIds)
//                 this.djangoPortalService.addRunTemplateJobToLogs(id, selectedKeysIds)
//                 console.log(selectedKeysIds, id)
//               })
//           }
//         }
//       })
//   }

//   const setSelectedKeysIds = (checked, id) => {
//     console.log(`keys: ${id}`)
//     if (checked) {
//       this.setState(state => ({
//         app: {
//           ...this.state.app,
//           selectedKeysIds: id
//         }
//       }))
//     }
//   }

//   const setSelectedTemplateIds = (checked, id) => {
//     console.log(`template: ${id}`)
//     if (checked) {
//       this.setState(state => ({
//         app: {
//           ...this.state.app,
//           selectedTemplatesIds: [...state.app.selectedTemplatesIds, id]
//         }
//       }))
//     }
//     else {
//       this.setState(state => ({
//         app: {
//           ...this.state.app,
//           selectedTemplatesIds: state.app.selectedTemplatesIds.filter(el => el !== id)
//         }
//       }))  
//     }
//   }
  

//   const setSelectedComputerId = (checked, id) => {
//     if (checked) {
//       this.setState(state => ({
//         app: {
//           ...this.state.app,
//           selectedComputerIds: [...state.app.selectedComputerIds, id]
//         }
//       }))
//     }
//     else {
//       this.setState(state => ({
//         app: {
//           ...this.state.app,
//           selectedComputerIds: state.app.selectedComputerIds.filter(el => el !== id)
//         }
//       }))  
//     }
//   }

//   const getAllComputersList = () => {
//     glpi10Service.getAllComputersList(state.app.glpiSessionToken)
//       .then(res => {
//         this.setState(state => ({
//           glpiData: {
//             ...state.glpiData,
//             allComputerList: [...state.glpiData.allComputerList, ...res.data],
//             allComputerListTotalCount: res.contentTotalCount
//           },
//         }))
//       })
//   }

//   // const loadMore = () => {
//   //   const {computersRangeFrom, computersRangeTo} = this.state.app
//   //   this.setState({
//   //     app: {
//   //       ...this.state.app,
//   //       loading: true
//   //     }
//   //   })
//   //   this.getAllComputers(computersRangeFrom, computersRangeTo)
//   // }


//   const semaforeService = new SemaforeService();

//   const semaforeLogin = async () => {
//     let result = await semaforeService.login()
//       .then(async (res) => {
//         if (res.ok) {
//           let st = await semaforeService.getSemaphoreUserTokens(state.app.semaphoreSessionToken)
//             .then(async res => {
//               let i = -1
//               for (let k = 0; k < res.length; k++) {
//                 let token = res[k]          
//                 if (!token.expired) {
//                   i = k
//                   break
//                 }
//               }
//               if (i !== -1) {
//                 return (res[i].id)        
//               }
//               else {
//                 await semaforeService.createSemaphoreApiToken()
//                   .then(res => {
//                     return res.id
//                   })
//               }  
//             })
//             return st
//         }
//         else {
//           console.log('login bad')
//         }
        
//       })
//       .then(st => {
//         this.setState({
//           app: {
//             ...this.state.app,
//             semaphoreSessionToken: st
//           }
//         })
//         return st
//       })
//       return result
//   }

//   const getSemaphoreKeysList = async () => {
//     this.semaforeService.getSemaphoreKeys()
//       .then(res => {
//         this.setState({
//           SemaphoreData: {
//             ...this.state.SemaphoreData,
//             keysList: res
//           }
//         })
//       })
//   }

//   const deleteSemaphoreTemplate = (id) => {
//     this.semaforeService.deleteSemaphoreTemplate(id)
//       .then(res => {
//         console.log(res)
//         this.getSemaforeTemplateList()
//       })
//   }

//   const getSemaforeTemplateList = (res) => {
//     this.semaforeService.getSemaphoreTemplates(res)
//     .then(res => {
//       // console.log(res.results.filter(el => el.inventory === 3))
//       this.setState(state => ({
//           SemaphoreData:{
//             ...this.state.SemaphoreData,
//             jobTemplateList: res
//           } 
//         }
//       ))
//     })
//   }

//   const getSemaphoreInventory = (st) => {
//     this.semaforeService.getSemaphoreInventory(st)
//       .then(res => {
//         if (res != []) {
//           // console.log(res.filter(el => el.name === 'portal_inventory')[0])
//           this.setState({
//             app: {
//               ...this.state.app,
//               glpiInventory: res.filter(el => el.name === 'portal_inventory')[0]
//             }
//           })
//         }
//       })
//   }

//   const loginAndGetTemplates = async () => {
//     this.semaforeLogin()
//       .then((res) => {
//         console.log(res)
//         // this.getSemaforeTemplateList()
//       })
//   }

//   useEffect(() => {
//     initGlpiSession()
//     semaforeLogin()
//       .then((res) => {
//         getSemaforeTemplateList(res)
//         getSemaphoreKeysList(res)
//         getSemaphoreInventory(res)
//       })
    
//     // this.loginAndGetTemplates()

//   })

//     const {loading, isError, selectedTemplatesIds,selectedComputerIds,selectedComputer, glpiSessionToken, newTemplateName, baseDir} = state.app
//     const {searchString} = state.search
//     const {computerList, allComputerList, allComputerListTotalCount, selComputersInfoList} = state.glpiData
//     const visibleComputerList = searchComp(computerList, searchString)
//     const {jobTemplateList, keysList} = state.SemaphoreData

    
//     return (
//       <>
//       <Router>
//         <div className="app">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-sm-12">
//                 <AppInfo/>
//                 {/* <Login/> */}
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-sm-12">
//                 <SearchPanel
//                   searchString = {searchString}
//                   changeSearchStr = {changeSearchStr}
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-sm-12">
//                 <MainNav baseDir={baseDir}/>
//               </div>
//             </div> 

//             <div className="row"> 
//               <div className="col-sm-2">
//                 <AssetsList
//                   getAllComputersList={getAllComputersList}
//                   allComputerList={searchComp(allComputerList, searchString)}
//                   // allComputerList={allComputerList}
//                   setSelectedComputerId={setSelectedComputerId}
//                   selectComputer = {selectComputer}
//                 />
//               </div> 

//               <div className="col-sm-10">
//                 <Switch>

//                   <Route exact path={baseDir}>
//                     <MainPage
//                       allComputerListTotalCount={allComputerListTotalCount}
//                     />
//                   </Route>

//                   <Route exact path={`${baseDir}automatization-page`}>

//                     <ErrorBoundary>
//                       <AutomatizationPage
//                         keysList = {keysList}
//                         selectedComputerIds = {selectedComputerIds}
//                         setSelectedTemplateIds = {setSelectedTemplateIds}
//                         setSelectedKeysIds = {setSelectedKeysIds} 
//                         jobTemplateList = {jobTemplateList}
//                         selectedTemplatesIds = {selectedTemplatesIds}
//                         runSemaphoreTemplate = {runSemaphoreTemplate}
//                         semaforeLogin = {semaforeLogin}
//                       />
//                     </ErrorBoundary>
//                   </Route>

//                   <Route exact path={`${baseDir}inventory-page`}>
//                     <InventoryPage
//                       // selectedComputerIds = {selectedComputerIds}
//                       selectedComputer = {selectedComputer}
//                       selComputersInfoList = {selComputersInfoList}
//                       getComputerIpArr = {getComputerIpArr}
//                       st = {glpiSessionToken}
//                     />
//                   </Route>

//                   <Route exact path={`${baseDir}computers-inventory-page`}>
//                     <ComputersInventoryPage/>
//                   </Route>

//                   <Route exact path={`${baseDir}phones-inventory-page`}>
//                     <PhonesInventoryPage/>
//                   </Route>

//                   <Route exact path={`${baseDir}network-inventory-page`}>
//                     <NetworkInventoryPage/>
//                   </Route>

//                   <Route exact path={`${baseDir}inventory-page`}>
//                     <InventoryPage/>
//                   </Route>

//                   <Route exact path={`${baseDir}templates-page`}>
//                     <TemplatesPage
//                       jobTemplateList = {jobTemplateList}
//                       addPlaybookHandler = {addPlaybookHandler}
//                       changeSelectedPlaybookFile = {changeSelectedPlaybookFile}
//                       deleteTemplate = {deleteSemaphoreTemplate}
//                       newTemplateName = {newTemplateName}
//                       changeInputNewTemplateName = {changeInputNewTemplateName}
//                     />
//                   </Route>

//                   <Route exact path={`${baseDir}reports-page`}>
//                     <ReportsPage/>
//                   </Route>

//                   <Route exact path={`${baseDir}control-page`}>
//                     <ControlPage/>
//                   </Route>

//                 </Switch>
//               </div>
//             </div>
//             <div className="row">
    
//             </div>
//           </div>
          
//         </div>
//       </Router>
//       </>
//     );
  
  
// } 

export default App;