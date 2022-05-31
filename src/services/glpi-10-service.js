

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


////////////////////////////////////////////////////////  
  computersCount = 5

  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getGlpiSessionToken = async () => {
    const res = await this.getResource(`${this._API_URL}initSession?app_token=${this.app_token}&user_token=${this.user_token}`)
    return res.session_token
  }

  getAllComputers = async (computersRangeFrom, computersRangeTo) => {
    // console.log(computersRangeFrom, computersRangeTo)
    const st = await this.getGlpiSessionToken()

    const x =  await this.getResource(`${this._API_URL}search/Computer/?criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=&criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&app_token=${this.app_token}&session_token=${st}&range=${computersRangeFrom}-${computersRangeTo-1}`)

    return(x)

  }
}

export default Glpi10Service