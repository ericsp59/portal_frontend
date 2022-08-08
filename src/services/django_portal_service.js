// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";
import Config from "./config_HOME.json";

const _API_BASE = Config.django_portal_API_BASE

class DjangoPortalService {
  
  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }


  addRunTemplateJobToLogs = async (job_template_name, job_template_keys) => {
    await fetch(`${_API_BASE}log_list/`, {
      method: 'POST',
      headers: {
        // 'mode':'no-cors',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "job_template_name": job_template_name.toString(),
        "job_template_keys": job_template_keys.toString()
      })
    })
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

}

export default DjangoPortalService