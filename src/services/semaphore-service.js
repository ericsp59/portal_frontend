
// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";
import Config from "./config_HOME.json";


const _API_BASE = Config.semaphore_API_BASE
// const _API_BASE = 'http://172.16.16.21:3000/api/'

class SemaphoreService {

  // semaphore_login = Config.semaphore_login
  // semaphore_pass = Config.semaphore_pass
  semaphore_login = 'apier'
  semaphore_pass = 'apier'

  deleteSemaphoreTemplate = async (id) => {
    let res = await fetch(`${_API_BASE}project/1/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },
    })
    return res
  }

  createSemaphoreTemplate = async (TemplateName, playbookName) => {
    let res = await fetch(`${_API_BASE}project/1/templates`, {
      method: 'POST',
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
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


  getSemaphoreKeys = async () => {
    let res = await fetch(`${_API_BASE}project/1/keys`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    return await res.json()
  }

  runSemaphoreTemplate = async (st, id) => {
    let res = await this.getSemaphoreTemplate(st, id)
      .then(async (template) => {
        // let environment = await this.getSemaphoreInvironment(template.environment_id)
        // console.log(environment)
        let res = await fetch(`${_API_BASE}project/1/tasks`, {
          method: "POST",
          headers: {
            'mode':'no-cors',
            // 'Authorization': `Bearer ${st}`
            // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
            'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
          },  
          body: JSON.stringify({ 
            "template_id": template.id,
            "debug": false,
            "dry_run": false
            // "playbook": template.playbook,
            // "environment": environment.name
          })
        })
        return await res.json()
      })
      return res
  }

  getSemaphoreInvironment = async (st, id) => {
    console.log(id)
    let res = await fetch(`${_API_BASE}project/1/environment`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    let env = await res.json()
    return env.filter(el => el.id == id)[0]
    // return await res.json()
  }

  updateSemaphoreInventory = async (st, inventory, ipAddresses, selectedKeysIds) => {
    console.log(selectedKeysIds)
    let res = await fetch(`${_API_BASE}project/1/inventory/${inventory['id']}`, {
      method: "PUT",
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
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

  getSemaphoreInventory = async (st) => {
    let res = await fetch(`${_API_BASE}project/1/inventory`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    return await res.json()
  }

  getSemaphoreTemplates = async (st) => {
    let res = await fetch(`${_API_BASE}project/1/templates`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    return await res.json()
  }

  getSemaphoreTemplate = async (st, id) => {
    let res = await fetch(`${_API_BASE}project/1/templates/${id}`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': `Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4=`
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    return await res.json()
  }

  getSemaphoreUserTokens = async (st) => {
    let res = await fetch(`${_API_BASE}user/tokens`, {
      headers: {
        'mode':'no-cors',
        // 'Authorization': `Bearer ${st}`
        // 'Authorization': 'Bearer jmukvrol3eua_kkjkv4brxsodbglujrrgaembgi4ks4='
        'Authorization': 'Bearer lxp95vn5an7spmw-y0ckvo13qa2irdywagansutyzde='
      },  
    })
    return await res.json()
  }

  createSemaphoreApiToken = async () => {
    let res = await fetch(`${_API_BASE}user/tokens`, {
      method: 'POST',
      // headers: {
      //   'mode':'no-cors'
      // },
      body: JSON.stringify({
        "auth": this.semaphore_login,
        "password": this.semaphore_login
      })
    })
    return await res.json()
  }

  login = async () => {
    let res = await fetch(`${_API_BASE}auth/login`, {
      method: 'POST',
      // headers: {
      //   'mode':'no-cors'
      // },
      body: JSON.stringify({
        "auth": this.semaphore_login,
        "password": this.semaphore_login
      })
    })
    // console.log(res.headers)

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