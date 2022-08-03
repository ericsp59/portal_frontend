// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";
import Config from "./config_HOME.json";


class Glpi10Service {

  /////////////////// home ////////////////

  // _API_URL = 'http://172.16.16.28/glpi/apirest.php/'
  // glpiIp='172.16.16.28' 
  // app_token='aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1'
  // user_token = 'aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1'

  //////////////////////////////

/////////////////// glpi.rtkit.local ////////////////

  // _API_URL = 'http://glpi.rtkit.local/glpi/apirest.php/'
  // glpiIp='glpi.rtkit.local'

  // user_token = '3Ugq1vOv44LrMwmaCCzUuDRnEw624YQSlKNjGtnN'
  // app_token ='h09YRTqWLy74CLwFtZeNN3CSeiPXsx1HhFe3SG9m'
  // session_token ='p827ga3k0rh4pnved7drqpnqug'

  _API_URL = Config._API_URL
  glpiIp = Config.glpiIp
  user_token = Config.user_token
  app_token = Config.app_token
  // session_token = Config.session_token
  


////////////////////////////////////////////////////////  
  computersCount = 5


  renameObjKeys = (obj) => {
    const voc = {
      1: 'name',
      2: 'id',
      4: 'type',
      5: 'serial',
      7: 'contact',
      19: 'date_mod',
      126: 'ipAddrArr',
      3: 'location',
      45: 'os',
      23: 'manufacturer',
      40: 'model',
      // 16: 'comment',
      112: 'devicenetworkcards',
      // 113: 'mac',
      111: 'devicememories',
      115: 'deviceharddrives',
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

  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    const data = await res.json()
    return (
      {
        aceptRange: res.headers.get('Accept-Range').split(' ')[1],
        contentTotalCount: res.headers.get('Content-Range').split('/')[1],
        data: data
      }
    )
  }
  getOneResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    // console.log(res.headers.get('Accept-Range').split(' ')[1])
    // console.log(res.headers.get('Content-Range').split('/')[1])
    // const data = await res.json()
    // return (
    //   {
    //     aceptRange: res.headers.get('Accept-Range').split(' ')[1],
    //     contentTotalCount: res.headers.get('Content-Range').split('/')[1],
    //     data: data
    //   }
    // )
    return await res.json()
  }

  getGlpiSessionToken = async () => {
    const res = await fetch(`${this._API_URL}initSession?user_token=${this.user_token}&app_token=${this.app_token}`)
    const data = await res.json()
    return data.session_token
  }


  getComputerIpArr = async (st,id) => {
      const res = await this.getOneResource(`${this._API_URL}search/Computer?
      criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
      criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=${id}&app_token=${this.app_token}&session_token=${st}`)
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.renameObjKeys(element)
        }
        return res.data
      }
  }

  // getAllComputers = async (st,computersRangeFrom=0, computersRangeTo=1000) => {
  //   const x =  await this.getResource(`${this._API_URL}search/Computer?
  //   criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
  //   criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=&criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&
  //   criteria[3][field]=3&criteria[3][searchtype]=contains&criteria[3][value]=&
  //   app_token=${this.app_token}&session_token=${st}&range=${computersRangeFrom}-${computersRangeTo-1}`)
  //   return(x.data)
  // }

  getSerchComputerInfoById = async (st, id) => {
    const x =  await this.getResource(`${this._API_URL}search/Computer?
    criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
    criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=${id}&
    criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&
    criteria[3][field]=3&criteria[3][searchtype]=contains&criteria[3][value]=&
    criteria[4][field]=40&criteria[4][searchtype]=contains&criteria[4][value]=&
    criteria[5][field]=111&criteria[5][searchtype]=contains&criteria[5][value]=&
    criteria[6][field]=115&criteria[6][searchtype]=contains&criteria[6][value]=&
    app_token=${this.app_token}&session_token=${st}`)
    return(x.data)
  }

  getAllComputersList = async (st) => {
    const res = await this.getResource(`${this._API_URL}Computer?app_token=${this.app_token}&session_token=${st}&expand_dropdowns=true&range=0-500`) 
    return res
  }

  getCompInfoById= async (st, id) => {
    if (id != null){
      const res = await this.getOneResource(`${this._API_URL}Computer/${id}?app_token=${this.app_token}&session_token=${st}`) 
      return res
    }
  }

  getResFromLink = async (st, link) => {
    // const st = this.session_token
    const res = await this.getOneResource(`${link}?app_token=${this.app_token}&session_token=${st}`)
    return res
  }
}

export default Glpi10Service