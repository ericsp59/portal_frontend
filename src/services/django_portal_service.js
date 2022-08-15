// import Config from "./config_RTK.json";
// import Config from "./config_EPK.json";
import Config from "./config_HOME.json";

const _API_BASE = Config.django_portal_API_BASE

class DjangoPortalService {

  // djangoLoginUser = async (e) => {
  //   e.preventDefault()
  //   let res = await fetch(`${_API_BASE}token/`,{
  //     method: 'POST',
  //     headers: {
  //       'content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       'username': e.target.username.value,
  //       'password': e.target.password.value,
  //     })
  //   })
    
  //   if (res.status === 200) {
  //     return await res.json()
  //   }
  //   else {
  //     alert('Что-то не так с авторизацией')
  //   }
  // }
  
  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
  }

  addPlaybookFileToGit = async (file) => {
    // http://127.0.0.1:8000/api/v1/add_playbook/
    let res = await fetch(`${_API_BASE}add_playbook/`, {
      method: 'POST',
      headers: {
        // 'mode':'no-cors',
        'Content-Disposition': `attachment; filename=${file.name}`,
        // 'Content-Disposition': 'attachment; filename=upload.txt',
        // 'Content-Type': 'text/plain; charset=utf-8'
      },
      // body: data
      body:  file,
    })
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