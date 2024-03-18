import axios from 'axios'
import {BASE_API_URL} from "../utils/Constant.js"
import { axiosPrivate } from '../api/axios.js';

const THREAD_URL = BASE_API_URL + '/threads'
class ThreadService {

  getAllThreads (currentPage, criteria) {
   
    let url = THREAD_URL;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=100`;
    }else{
      url += `?page=1&limit=100`;
    }
    url += `&key=${criteria.key}&status=${criteria?.status}`

    criteria.tags.forEach(element => {
      url+= `&tags[]=${element}`
    });

    criteria.categories.forEach(element => {
      url+= `&categories[]=${element}`
    });
    
    return axios.get(url)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

  getById (id) {
   
    
    return axios.get(THREAD_URL+`/${id}`)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  createThread(thread){
    console.log(thread)
    return axiosPrivate.post(THREAD_URL,thread)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  attachTag(threadId, tags) {
    return axiosPrivate.patch(THREAD_URL + `/${threadId}/attach-tag`, {
      tags: tags,
    });
  }


}

export default new ThreadService()
