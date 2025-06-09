import myAxios from '@/api/aqirequest.js'
const DEFAULT_SDE_CONNECTION  = JSON.stringify({"portalItemID":"3a703edc812445629190004760670f59"})
const DEFAULT_FORMAT_JSON  = 'json'

export const kelijin = async (paramsDatetime) => {
  const params = new URLSearchParams()// 创建一个 URLSearchParams 实例
  params.append('sde_connection_input', DEFAULT_SDE_CONNECTION ) // 添加参数
  params.append('target_datetime', paramsDatetime) // 添加参数
  params.append('f', DEFAULT_FORMAT_JSON) // 添加参数
  return myAxios.request({
      url: 'submitJob',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: params.toString() // 将参数转换为字符串
  })
}

export const paramWorkStatus = async(jobid) => {

  return myAxios.request({
      url: `jobs/${jobid}?f=json`,
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      },
  })
}

export const intervalWork = async(jobid) => {

  let setintervalparam = null

  return new Promise((res,reject)=>{
    setintervalparam=setInterval(async()=>{
      const statusRus = await paramWorkStatus(jobid)
      console.log(statusRus.data.jobStatus)
      // console.log(statusRus.data)
      if(statusRus.data.jobStatus== 'esriJobSucceeded'){
        clearInterval(setintervalparam)
        res(statusRus.data)


      }
  },100)

   })
}


export const finallyWorkStatus = async (jobid)=>{
  const params = new URLSearchParams()// 创建一个 URLSearchParams 实例
  params.append('bbox','115.4,39.4,117.6,41.1')
  params.append('bboxSR','4326')
  params.append('imageSR','4326')
  params.append('size','1024,768')
  params.append('format','tiff')
  params.append('transparent','false')
  params.append('dpi','96')

  params.append('f',DEFAULT_FORMAT_JSON ) // 添加参数
  return myAxios.request({
      url: `jobs/${jobid}/results/output_kriging_raster/export`,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: params.toString() // 将参数转换为字符串
  })
}
