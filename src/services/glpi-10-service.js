

class Glpi10Service {

  /////////////////// home ////////////////

  // _API_URL = 'http://172.16.16.28/glpi/apirest.php/'
  // glpiIp='172.16.16.28' 
  // app_token='aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1'
  // user_token = 'aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1'

  //////////////////////////////

/////////////////// glpi.rtkit.local ////////////////

  _API_URL = 'http://glpi.rtkit.local/glpi/apirest.php/'
  glpiIp='glpi.rtkit.local'
  user_token = 'oaqc8exR5C9CPKgH5ftWezibrvQtWMYUebWphg9Z'
  app_token ='wiHqygFUuTIlwKE6rzlOje1cVjLIpqYUo3mZUjfq'
  session_token ='rjv1vg29c5gfa9cnp4vrpklvht'


////////////////////////////////////////////////////////  
  computersCount = 5


  renameObjKeys = (obj) => {
    const voc = {
      1: 'name',
      2: 'id',
      5: 'serial',
      7: 'contact',
      19: 'date_mod',
      126: 'ipAddrArr',
      3: 'location'
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
    // console.log(res.headers.get('Accept-Range').split(' ')[1])
    // console.log(res.headers.get('Content-Range').split('/')[1])
    const data = await res.json()
    return (
      {
        aceptRange: res.headers.get('Accept-Range').split(' ')[1],
        contentTotalCount: res.headers.get('Content-Range').split('/')[1],
        data: data
      }
    )
    // return await res.json()
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
    const res = await this.getResource(`${this._API_URL}initSession?app_token=${this.app_token}&user_token=${this.user_token}`)
    console.log(res.session_token)
    return res.session_token
  }

  getComputerIpArr = async (id) => {
      // const st = await this.getGlpiSessionToken()
      const st = this.session_token
      const res = await this.getOneResource(`${this._API_URL}search/Computer?
      criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
      criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=${id}&app_token=${this.app_token}&session_token=${st}`)
      for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          this.renameObjKeys(element)
        }
        return res.data
      // return res
  }

  getAllComputers = async (computersRangeFrom, computersRangeTo) => {
    // const st = await this.getGlpiSessionToken()
    const st = this.session_token

    const x =  await this.getResource(`${this._API_URL}search/Computer/?
    criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&
    criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=&criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&
    criteria[3][field]=3&criteria[3][searchtype]=contains&criteria[3][value]=&
    app_token=${this.app_token}&session_token=${st}&range=${computersRangeFrom}-${computersRangeTo-1}`)
    return(x)
  }

  getAllComputersList = async () => {
    // const st = await this.getGlpiSessionToken()
    const st = this.session_token
    const res = await this.getResource(`${this._API_URL}Computer?app_token=${this.app_token}&session_token=${st}&expand_dropdowns=true&range=0-500`) 
    // console.log(res)
    return res
  }

  getCompInfoById= async (id) => {
    if (id != null){
      // const st = await this.getGlpiSessionToken()
      const st = this.session_token
      const res = await this.getOneResource(`${this._API_URL}Computer/${id}?app_token=${this.app_token}&session_token=${st}`) 
      return res
    }
  }

  getResFromLink = async (link) => {
    const st = this.session_token
    const res = await this.getOneResource(`${link}?app_token=${this.app_token}&session_token=${st}`)
    return res
  }

}

export default Glpi10Service