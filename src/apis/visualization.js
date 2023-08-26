import request from '@/utils/request'

export const getVisualization = () =>{
  return request({
    url: '/visualization'
  })
}