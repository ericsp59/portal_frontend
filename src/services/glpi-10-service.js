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

  getDeviceIpArr = async (type, id) => {
    if (id != null){
      const res = await fetch(`${this.django_portal_API_BASE}get_device_ip_by_id/`, {
        method: 'GET',
        headers: {'ID': id, 'Type': type},
        mode: 'cors' //'same-origin'
      })
      const data = await res.json()
      return {
        data: data.data.ip
      }
    }
  } 


  getAllTypeDevList = async (devType) => {
    const myHeaders = new Headers();
    myHeaders.append('Type', devType);
    const res = await fetch(`${this.django_portal_API_BASE}get_devices/`, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors' //'same-origin'
    })
    const data = await res.json()
    return {
      data: data.data
    }
  }

  getNetworkDevInfoById = async (id) => {
    if (id != null){
      const res = await fetch(`${this.django_portal_API_BASE}get_net_device_info_by_id/`, {
        method: 'GET',
        headers: {'ID': id},
        mode: 'cors' //'same-origin'
      })
      const data = await res.json()
      return {
        data: data
      }
    }
  }

  // ######################### get_phone_info_by_id
  getPhoneInfoById = async (id) => {
    if (id != null){
      const res = await fetch(`${this.django_portal_API_BASE}get_phone_info_by_id/`, {
        method: 'GET',
        headers: {'ID': id},
        mode: 'cors' //'same-origin'
      })
      const data = await res.json()
      return {
        data: data
      }
    }
  }

  getCompInfoById = async (id) => {
    if (id != null){
      const res = await fetch(`${this.django_portal_API_BASE}get_computer_info_by_id/`, {
        method: 'GET',
        headers: {'ID': id},
        mode: 'cors' //'same-origin'
      })
      const data = await res.json()
      return {
        data: data
      }
    }
  }
}

export default Glpi10Service