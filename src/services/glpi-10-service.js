// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";

import Config from "./config_HOME.json";





class Glpi10Service {


  // _API_URL = Config._API_URL
  // glpiIp = Config.glpiIp
  // user_token = Config.user_token
  // app_token = Config.app_token
  // session_token = Config.session_token
  

  django_portal_API_BASE = Config.django_portal_API_BASE
////////////////////////////////////////////////////////  
  computersCount = 5

  getGlpiConfig = async () => {
    const res = await fetch(`${this.django_portal_API_BASE}get_glpi_settings/`, {
      'method': 'GET'
    })
    const data = await res.json()
    return data.data
  }

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

  getRes = async (url,st, glpiAuthConfig) => {
    let res = await fetch(`${glpiAuthConfig.glpi_api_url}${url}`,{
      'method': 'GET',
      'headers': {
        'session-token': `${st}`,
        'app-token': `${glpiAuthConfig.glpi_app_token}`
      }
    })
    if (!res.ok) {
      alert('Что-то не так с загрузкой данных из GLPI')
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      
    }
    return res
  }

  getOneRes = async (url, st, glpiAuthConfig) => {
    let res = await fetch(`${glpiAuthConfig.glpi_api_url}${url}`,{
      'method': 'GET',
      'headers': {
        'session-token': `${st}`,
        'app-token': `${glpiAuthConfig.glpi_app_token}`
      }
    })
    if (!res.ok) {
      console.log('Что-то не так с загрузкой данных из GLPI')
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      
    }
    const data = await res.json()
    return data
  }

  getGlpiSessionToken = async (glpiAuthConfig) => {
    const res = await fetch(`${glpiAuthConfig.glpi_api_url}initSession`, {
      'method': 'GET',
      'headers': {
        'Authorization': `user_token ${glpiAuthConfig.glpi_user_token}`,
        'app-token': `${glpiAuthConfig.glpi_app_token}`

      }
    })
    const data = await res.json()
    return data.session_token
  }


  getComputerIpArr = async (st,id, glpiAuthConfig) => {
    const res = await this.getOneRes(`search/Computer?
    criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
    criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=${id}`,st, glpiAuthConfig)

    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        this.renameObjKeys(element)
      }
      return res.data
    }
  }


  getSerchComputerInfoById = async (st, id, glpiAuthConfig) => {
    const res = await this.getRes(`search/Computer?
      criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
      criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=${id}&
      criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&
      criteria[3][field]=3&criteria[3][searchtype]=contains&criteria[3][value]=&
      criteria[4][field]=40&criteria[4][searchtype]=contains&criteria[4][value]=&
      criteria[5][field]=111&criteria[5][searchtype]=contains&criteria[5][value]=&
      criteria[6][field]=115&criteria[6][searchtype]=contains&criteria[6][value]=&`, st, glpiAuthConfig)
      const data = await res.json()
      return data
    }
    
    getSerchPhoneInfoById = async (st, id, glpiAuthConfig) => {
    const res = await this.getRes(`search/Phone?
      criteria[0][link]=AND&criteria[0][field]=2&criteria[0][searchtype]=contains&criteria[0][value]=${id}&
      criteria[1][field]=5&criteria[1][searchtype]=contains&criteria[1][value]=&`, st, glpiAuthConfig)  
    const data = await res.json()
    return data
    }
  

  getAllComputersList = async (st, glpiAuthConfig) => {
    const res = await this.getRes(`Computer?expand_dropdowns=true&range=0-500`, st, glpiAuthConfig)
    const data = await res.json()
    return {
      aceptRange: res.headers.get('Accept-Range').split(' ')[1],
      contentTotalCount: res.headers.get('Content-Range').split('/')[1],
      data: data
    }
  }
  getAllPhonesList = async (st, glpiAuthConfig) => {
    const res = await this.getRes(`Phone?expand_dropdowns=true&range=0-500`, st, glpiAuthConfig)
    const data = await res.json()
    console.log(data)
    return {
      aceptRange: res.headers.get('Accept-Range').split(' ')[1],
      contentTotalCount: res.headers.get('Content-Range').split('/')[1],
      data: data
    }
  }

  getAllTypeDevList = async (devType) => {
    const res = await fetch(`${this.django_portal_API_BASE}get_devices/`, {
      headers: {'Type': devType}
    })
    const data = await res.json()
    return {
      data: data
    }
  }


  getPhoneInfoById= async (st, id, glpiAuthConfig) => {
    if (id != null){
      const res = await this.getOneRes(`Phone/${id}`,st, glpiAuthConfig) 
      return res
    }
  }
  getCompInfoById= async (st, id, glpiAuthConfig) => {
    if (id != null){
      const res = await this.getOneRes(`Computer/${id}`,st, glpiAuthConfig) 
      return res
    }
  }

  getResFromLink = async (st, link, glpiAuthConfig) => {
    const new_link = link.replace(glpiAuthConfig.glpi_api_url, '')
    const res = await this.getOneRes(`${new_link}`, st, glpiAuthConfig)
    return res
  }
}

export default Glpi10Service