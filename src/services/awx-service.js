

class AWXService {
  getResource = async (url) => {
    let res = await fetch(url,{
      headers : {
      'Authorization': 'Bearer EQ8BEc1gzW40TXBrkRzGshKKRT69pi',
      'mode':'no-cors'
    }})
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  launchJobTemplate = async (url) => {
    await fetch(url, {
      method: 'POST',
      headers : {
        'Authorization': 'Bearer EQ8BEc1gzW40TXBrkRzGshKKRT69pi',
        'mode':'no-cors',
      }
    })
  }

  print = (data) => {
    console.log(data)
  }

  // fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
  //   method: 'post',
  //   body: 'test=1',
  //   headers: {
  //       'email': 'max@test.com',
  //       'password': '12345',
  //   }

  getJobTemplateList = () => {
    return this.getResource('https://awx-debian11.local/api/v2/job_templates/');
    // console.log('https://awx-debian11.local/api/v2/job_templates/')
  }
}

export default AWXService