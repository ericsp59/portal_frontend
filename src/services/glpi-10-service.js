

class Glpi10Service {
  glpiIp='172.16.16.28'
  app_token='aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1'
  session_token='r4g0qmgrlco2qfdp27u4nc8q0q'
  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllComputers = async () => {
    const d = await this.getResource(`http://${this.glpiIp}/glpi/apirest.php/Computer/?app_token=${this.app_token}&session_token=${this.session_token}`)
    return d
  }


  // http://172.16.16.28/glpi/apirest.php/search/Computer/?criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&app_token=aQdNykvkhbrYgZqHzbG60bKv4MIdvXox90ktcxX1&session_token=r4g0qmgrlco2qfdp27u4nc8q0q&criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]
  getAllComputersSearch = async () => {
    return await this.getResource(`http://${this.glpiIp}/glpi/apirest.php/search/Computer/?criteria[0][link]=AND&criteria[0][field]=126&criteria[0][searchtype]=contains&criteria[0][value]=&criteria[1][link]=AND&criteria[1][field]=2&criteria[1][searchtype]=contains&criteria[1][value]=&criteria[2][link]=AND&criteria[2][field]=7&criteria[2][searchtype]=contains&criteria[2][value]=&app_token=${this.app_token}&session_token=${this.session_token}`)

  }

  // getAllIpAddr = () => {
  //   return this.getResource(`http://${this.glpiIp}/glpi/apirest.php/IPAddress/?app_token=${this.app_token}&session_token=${this.session_token}`);
  // }

  // getIpAddr = (id) => {
  //   return this.getResource(`http://${this.glpiIp}/glpi/apirest.php/IPAddress/${id}/?app_token=${this.app_token}&session_token=${this.session_token}`);
  // }
}

export default Glpi10Service