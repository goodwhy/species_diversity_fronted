import myAxios from './request.js'

export const airQualityData = async () => {
    return myAxios.request({
        url: 'aqi/station_lastest_list/',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const A_stationData = async (params) => {
    return myAxios.request({
        url: `aqi/station/${params}/hourly-records/`,
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const birdData = async (params) => {
    return myAxios.request({
        url: 'birds/summary/district-species/',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
}

