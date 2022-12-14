////////// RTK ////////////////
// const token = 'Bearer HIPAvlLsE5mzDQUxyCJwkxRLhdF4Lc' 
const token = 'Bearer lo6nxVQOvC7RK2wMEC5FDJVJy8MyCH' 
 const _API_BASE = 'http://awx.rtkit.local/api/v2/'

/////////////////////////////// lo6nxVQOvC7RK2wMEC5FDJVJy8MyCH

///////// HOME //////////////////

// const token = 'Bearer EQ8BEc1gzW40TXBrkRzGshKKRT69pi' 
// const _API_BASE = 'https://awx-debian11.local/api/v2/'

////////////////////////////////////

class AWXService {
  getResource = async (url) => {
    let res = await fetch(url,{
      headers : {
      'Authorization': token,
      'mode':'no-cors'
    }})
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  launchJobTemplate = async (id) => {
    await fetch(`${_API_BASE}job_templates/${id}/launch/`, {
      method: 'POST',
      headers : {
        'Authorization': token,
        'mode':'no-cors',
      }
    })
  }

  print = (data) => {
    console.log(data)
  }

  clearInventory = async () => {
    await this.getInvHostList()
      // .then(res => {
      //   res.forEach((element) => {
      //     this.removeInventoryHost(element.id)
      //       .then(() => {
      //         console.log('удален', element.id)
      //       }) 
      //   });
      // })
      .then( async res =>  {
        for (const element of res) {
          await this.removeInventoryHost(element.id)
            .then(() => {
              console.log('удален', element.id)
            })
        }
      })
  }
  
  getInvHostList = async (id=3) => {
    const res = await this.getResource(`${_API_BASE}inventories/${id}/hosts/`);
    return await res.results
  }

  removeInventoryHost = async (hostId) => {
    await fetch(`${_API_BASE}hosts/${hostId}/`, {
      method: 'DELETE',
      headers : {
        'Authorization': token,
        'mode':'no-cors',
      }
    })
    // .then (() => console.log('Удален', hostId))
  }

  addInventoryHostList = async (ip, id=3) => {
    const hostList = await this.getInvHostList()
    // console.log(hostList)
    hostList.forEach(el => {
      if (el.name == ip) return
    })
    await fetch(`${_API_BASE}inventories/${id}/hosts/`, {
      method: 'POST',
      body: JSON.stringify( {
        "name": ip,
        "description": "",
        "enabled": true,
        "instance_id": "",
        "variables": ""
    }),
      headers : {
        'Authorization': token,
        'mode':'no-cors',
        "Content-Type": "application/json"
      }
    })
  }

  // fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
  //   method: 'post',
  //   body: 'test=1',
  //   headers: {
  //       'email': 'max@test.com',
  //       'password': '12345',
  //   }

  getJobTemplateList = () => {
    return this.getResource(`${_API_BASE}job_templates/`);
    // console.log('https://awx-debian11.local/api/v2/job_templates/')
  }
}

export default AWXService