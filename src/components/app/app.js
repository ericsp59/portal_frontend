import './app.css'
import Spinner from '../spinner/spinner';
import AppInfo from '../app-info/app-info'
import MainNav from '../main-nav/main-nav';
import ErrorBoundary from '../error-boundary/error-boundary';
import Content from '../content/content';
import SearchPanel from '../search-panel/search-panel';
import AWXService from '../../services/awx-service';
import { Component } from 'react';
import Glpi10Service from '../../services/glpi-10-service'
import Error from '../error/error';



class App extends Component{
  // constructor(props){
  //   super(props)
  // }

  state = {
    glpiData: {
      computerList: [],
      selectedComputerItems:[],
      computerListTotalCount: 0
    },
    awxData: {
      jobTemplateList: []
    },
    search: {
      searchString: ''
    },
    app: {
      loading: true,
      isError: false,
      loadMoreButtonIsDisabled: false,
      computersRangeFrom: 0,
      computersRangeTo: 50,
      computersLoadCount: 10
    }
  }

 

  //////////////// checkbox computerListItem //////////////
  computerItemToggleCheck = (checked, ip) =>{    
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

  renameObjKeys = (obj) => {
    const voc = {
      1: 'name',
      2: 'id',
      5: 'serial',
      7: 'contact',
      19: 'date_mod',
      126: 'ipAddrArr'
    }

    for (const prop in obj){
      if (prop in voc){
        Object.defineProperty(obj, voc[prop],
          Object.getOwnPropertyDescriptor(obj, prop));
        delete obj[prop];
      }
    }
    return obj
  }

  glpi10Service = new Glpi10Service()

  loadMore = () => {
    const {computersRangeFrom, computersRangeTo,computersLoadCount} = this.state.app
    this.setState({
      app: {
        ...this.state.app,
        loading: true
      }
    })
    this.getAllComputers(computersRangeFrom, computersRangeTo, computersLoadCount)
  }


  getAllComputers = (computersRangeFrom, computersRangeTo, computersLoadCount) => {

    if (computersRangeTo + computersLoadCount > this.state.glpiData.computerListTotalCount &&  this.state.glpiData.computerListTotalCount !== 0) {
      computersRangeTo = this.state.glpiData.computerListTotalCount
      this.setState({
        app: {
          ...this.state.app,
          loadMoreButtonIsDisabled: true
        }
      })
    }

    this.glpi10Service.getAllComputers(computersRangeFrom, computersRangeTo, computersLoadCount)
      .then(res => {
        this.setState(state => ({
          glpiData: {
            ...state.glpiData,
            computerListTotalCount: res.totalcount
          }
        }))
        
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.renameObjKeys(element)
        }
        return res.data
      })
      .then(res => {  // Фильтруем ip адреса
        res.forEach(el => {
          let ipAddrs = []
          if (typeof el.ipAddrArr === 'string') {
            el.ipAddrArr = [el.ipAddrArr]
          }
          el.ipAddrArr.forEach(ip => {
            if (ip !== '127.0.0.1' && ip.length > 7 && ip.length <= 15 ) {
              ipAddrs.push(ip)
            }  
          });
          el.ipAddrArr = ipAddrs
        });
        return res
      })
      .then(res => {
        this.setState(state => ({
          glpiData: {
            ...state.glpiData,
            computerList: [...state.glpiData.computerList, ...res ],
          },
          app: {
            ...state.app,
            loading: false,
            computersRangeFrom: computersRangeTo,
            computersRangeTo: computersRangeTo + computersLoadCount
          }
        }))
      })
      .catch((e) => {
        this.setState((state) => ({
          app: {
            ...state.app,
            isError: true
          }
        }))
      })
  }

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
    
    const {computersRangeFrom, computersRangeTo,computersLoadCount} = this.state.app
    this.getAllComputers(computersRangeFrom, computersRangeTo, computersLoadCount)
    this.getJobTemplateList()
    this.awxService.clearInventory()
  }


  render() {

    const {loading, isError, loadMoreButtonIsDisabled} = this.state.app
    const {searchString} = this.state.search
    const {computerList} = this.state.glpiData
    const visibleComputerList = this.searchComp(computerList, searchString)
    const {jobTemplateList} = this.state.awxData

    return (
      <div className="app">
        <div className="container">
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
            <div className="col-sm-3">
              <MainNav/>
            </div>
            <div className="col-sm-9">

              {isError ? <Error/> :(loading ? <Spinner/>
              :
              <ErrorBoundary>
                <Content
                  computerList = {visibleComputerList}
                  jobTemplateList = {jobTemplateList}
                  computerItemToggleCheck = {this.computerItemToggleCheck}
                  loadMore = {this.loadMore}
                  loadMoreButtonIsDisabled = {loadMoreButtonIsDisabled}
                />
              </ErrorBoundary>
)}
            </div>

          </div>
          <div className="row">
  
          </div>
        </div>
        
      </div>
    );
  
  }


}

export default App;