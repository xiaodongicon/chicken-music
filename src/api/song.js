import {commonParams} from './config'
import {getUid} from 'common/js/uid'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getSongsUrl(songs) {
  const url = debug ? 'api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return axios.post(url, {
    comm: data,
    url_mid: genUrlMid(mids, types)
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
