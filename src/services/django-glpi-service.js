

class DjangoGlpiService {
  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllComputers = () => {
    return this.getResource('http://localhost:8000/api/glpi/');
  }
}

export default DjangoGlpiService