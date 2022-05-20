import './app.css'
import AppInfo from '../app-info/app-info'
import MainNav from '../main-nav/main-nav';
import Content from '../content/content';
import SearchPanel from '../search-panel/search-panel';
import GlpiService from '../../services/glpi-service';
import AWXService from '../../services/awx-service';
import { Component } from 'react';


// const glpiService = new GlpiService();

// glpiService.getAllComputers()
//   .then(res => res.forEach(el => console.log(el)))



class App extends Component{
  constructor(props){
    super(props)
    this.getAllComputers()
    this.getJobTemplateList()
  }

  state = {
    data: [],
    awxData: {
      jobTemplateList: []
    }
  }

  glpiService = new GlpiService();
  getAllComputers = () => {
    this.glpiService.getAllComputers()
      .then(res => {
        this.setState({
          data: res  
        })
      })
  }

  awxService = new AWXService();
  getJobTemplateList = () => {
    console.log('getJobTemplateList start' )  
    this.awxService.getJobTemplateList()
      .then(res => {
        console.log('list' )
        this.setState({
          awxData:{
            jobTemplateList: res.results 
          } 
        })
      })
      .then(() => console.log('getJobTemplateList done' ))  
  }

  // count = data.length
  render() {
    // console.log(this.state.JobTemplateList)
    const {data} = this.state
    const {jobTemplateList} = this.state.awxData
    const count = data.length
    return (
      <div className="app">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <AppInfo count={count}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <SearchPanel/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <MainNav/>
            </div>
            <div className="col-sm-10">
              <Content
                data = {data}
                jobTemplateList = {jobTemplateList}
              />
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