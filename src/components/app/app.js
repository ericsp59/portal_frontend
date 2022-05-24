import './app.css'
import Spinner from '../spinner/spinner';
import AppInfo from '../app-info/app-info'
import MainNav from '../main-nav/main-nav';
import Content from '../content/content';
import SearchPanel from '../search-panel/search-panel';
import AWXService from '../../services/awx-service';
import { Component } from 'react';
import Glpi10Service from '../../services/glpi-10-service'


class App extends Component{
  constructor(props){
    super(props)
    this.getAllComputers()
    this.getJobTemplateList()
  }

  state = {
    glpiData: {
      computerList: [],
    },
    awxData: {
      jobTemplateList: []
    },
    search: {
      searchString: ''
    },
    app: {
      loading: true
    }
  }

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

  getAllComputers = () => {
    this.glpi10Service.getAllComputersSearch()
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.renameObjKeys(element)
        }
        return res.data
      })
      .then(res => {
        this.setState({
          glpiData: {
            computerList: res,
          },
          app: {
            loading: false
          }
        })
      })
  }

  awxService = new AWXService();
  getJobTemplateList = () => { 
    this.awxService.getJobTemplateList()
      .then(res => {
        this.setState(state => ({
            awxData:{
              jobTemplateList: res.results 
            } 
          }
        ))
      })
  }

  render() {

    const {loading} = this.state.app
    const {searchString} = this.state.search
    const {computerList} = this.state.glpiData
    const visibleComputerList = this.searchComp(computerList, searchString)
    const {jobTemplateList} = this.state.awxData

    return (
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
            <div className="col-sm-2">
              <MainNav/>
            </div>
            <div className="col-sm-10">

              {loading ? <Spinner/>
              :<Content
                computerList = {visibleComputerList}
                jobTemplateList = {jobTemplateList}
              />}
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