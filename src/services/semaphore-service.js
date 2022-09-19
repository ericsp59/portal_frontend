
// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";
import Config from "./config_HOME.json";


// const _API_BASE = Config.semaphore_API_BASE
// const _API_BASE = 'http://172.16.16.21:3000/api/'

class SemaphoreService {

  django_portal_API_BASE = Config.django_portal_API_BASE

  getSemaphoreConfig = async () => {
    const res = await fetch(`${this.django_portal_API_BASE}get_semaphore_settings/`, {
      'method': 'GET'
    })
    const data = await res.json()
    return data.data
  }

  // semaphore_login = Config.semaphore_login
  // semaphore_pass = Config.semaphore_pass
  // semaphore_login = 'apier'
  // semaphore_pass = 'apier'

  deleteSemaphoreTemplate = async (semaphoreConfig, id) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },
    })
    return res
  }

  createSemaphoreTemplate = async (semaphoreConfig,TemplateName, playbookName) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/templates`, {
      method: 'POST',
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },
      body: JSON.stringify({
        "project_id": 1,
        "inventory_id": 1,
        "repository_id": 1,
        "environment_id": 1,
        "name": TemplateName,
        "playbook": `playbooks/${playbookName}`,
        "arguments": "[]",
        "override_args": true
      })
    })
    return await res.json()
  }


  getSemaphoreKeys = async (semaphoreConfig) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/keys`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    return await res.json()
  }

  runSemaphoreTemplate = async (semaphoreConfig, id) => {
    let res = await this.getSemaphoreTemplate(semaphoreConfig, id)
      .then(async (template) => {
        // let environment = await this.getSemaphoreInvironment(template.environment_id)
        // console.log(environment)
        let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/tasks`, {
          method: "POST",
          headers: {
            'mode':'no-cors',
            // 'Authorization': `Bearer ${st}`
            // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
            'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
          },  
          body: JSON.stringify({ 
            "template_id": template.id,
            "debug": false,
            "dry_run": false
            // "playbook": template.playbook,
            // "environment": environment.name
          })
        })
        const data = await res.json()
        return data
      })
      return res
  }

  getSemaphoreTaskOutput = async (semaphoreConfig,id) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/tasks/${id}/output`, {
      headers: {
        'mode':'no-cors',
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    let data = await res.json()
    return data
  }

  getSemaphoreTasks = async (semaphoreConfig) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/tasks`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    let data = await res.json()
    // console.log(data)
    return data
    // return await res.json()
  }

  getSemaphoreInvironment = async (semaphoreConfig, id) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/environment`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    let env = await res.json()
    return env.filter(el => el.id == id)[0]
    // return await res.json()
  }

  updateSemaphoreInventory = async (semaphoreConfig, inventory, ipAddresses, selectedKeysIds) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/inventory/${inventory['id']}`, {
      method: "PUT",
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
      body: JSON.stringify({ 
        "id": inventory['id'],
        "name": inventory["name"],
        "project_id": inventory["project_id"],
        "inventory": ipAddresses,
        // "ssh_key_id": inventory["ssh_key_id"],
        "ssh_key_id": selectedKeysIds,
        "become_key_id": selectedKeysIds,
        // "become_key_id": inventory["become_key_id"],
        "type": inventory["type"]
      })
    })
    return res
  }

  getSemaphoreInventory = async (semaphoreConfig) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/inventory`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    const data = await res.json()
    return data
  }

  getSemaphoreTemplates = async (semaphoreConfig) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/templates`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    return await res.json()
  }

  getSemaphoreTemplate = async (semaphoreConfig, id) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}project/1/templates/${id}`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    return await res.json()
  }

  getSemaphoreUserTokens = async (semaphoreConfig) => {
    let res = await fetch(`${semaphoreConfig.semaphore_api_url}user/tokens`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': 'Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4='
        'Authorization': `Bearer ${semaphoreConfig.semaphore_user_token}`
      },  
    })
    return await res.json()
  }

  createSemaphoreApiToken = async (semaphoreAuthConfig) => {
    console.log('Create Token!!!', semaphoreAuthConfig)
    let res = await fetch(`${semaphoreAuthConfig.semaphore_api_url}user/tokens`, {
      method: 'POST',
      // headers: {
      //   'mode':'no-cors'
      // },
      body: JSON.stringify({
        "auth": semaphoreAuthConfig.semaphore_user_login,
        "password": semaphoreAuthConfig.semaphore_user_password
      })
    })
    return await res.json()
  }

  login = async (gsemaphoreAuthConfig) => {
    let res = await fetch(`${gsemaphoreAuthConfig.semaphore_api_url}auth/login`, {
      method: 'POST',
      // headers: {
      //   'mode':'no-cors'
      // },
      body: JSON.stringify({
        "auth": gsemaphoreAuthConfig.semaphore_user_login,
        "password": gsemaphoreAuthConfig.semaphore_user_password
      })
    })
    return res
  }


  // getResource = async (url) => {
  //   let res = await fetch(url,{
  //     headers : {
  //     'Authorization': token,
  //     'mode':'no-cors'
  //   }})
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  //   }

  //   return await res.json()
  // }

  // launchJobTemplate = async (id) => {
  //   await fetch(`${_API_BASE}job_templates/${id}/launch/`, {
  //     method: 'POST',
  //     headers : {
  //       'Authorization': token,
  //       'mode':'no-cors',
  //     }
  //   })
  // }

  // print = (data) => {
  //   console.log(data)
  // }

  // clearInventory = async () => {
  //   await this.getInvHostList()
  //     // .then(res => {
  //     //   res.forEach((element) => {
  //     //     this.removeInventoryHost(element.id)
  //     //       .then(() => {
  //     //         console.log('удален', element.id)
  //     //       }) 
  //     //   });
  //     // })
  //     .then( async res =>  {
  //       for (const element of res) {
  //         await this.removeInventoryHost(element.id)
  //           .then(() => {
  //             console.log('удален', element.id)
  //           })
  //       }
  //     })
  // }
  
  // getInvHostList = async (id=3) => {
  //   const res = await this.getResource(`${_API_BASE}inventories/${id}/hosts/`);
  //   return await res.results
  // }

  // removeInventoryHost = async (hostId) => {
  //   await fetch(`${_API_BASE}hosts/${hostId}/`, {
  //     method: 'DELETE',
  //     headers : {
  //       'Authorization': token,
  //       'mode':'no-cors',
  //     }
  //   })
  //   // .then (() => console.log('Удален', hostId))
  // }

  // addInventoryHostList = async (ip, id=3) => {
  //   const hostList = await this.getInvHostList()
  //   // console.log(hostList)
  //   hostList.forEach(el => {
  //     if (el.name == ip) return
  //   })
  //   await fetch(`${_API_BASE}inventories/${id}/hosts/`, {
  //     method: 'POST',
  //     body: JSON.stringify( {
  //       "name": ip,
  //       "description": "",
  //       "enabled": true,
  //       "instance_id": "",
  //       "variables": ""
  //   }),
  //     headers : {
  //       'Authorization': token,
  //       'mode':'no-cors',
  //       "Content-Type": "application/json"
  //     }
  //   })
  // }

  // fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
  //   method: 'post',
  //   body: 'test=1',
  //   headers: {
  //       'email': 'max@test.com',
  //       'password': '12345',
  //   }

  // getJobTemplateList = () => {
  //   return this.getResource(`${_API_BASE}job_templates/`);
  //   // console.log('https://awx-debian11.local/api/v2/job_templates/')
  // }
}

export default SemaphoreService