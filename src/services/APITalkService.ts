import axios, { Axios, AxiosResponse } from "axios";

export interface IAPITalkService {
  get: (url: string, params: any, tokenRequired: boolean) => void;
  post: (url: string, params: any, tokenRequired: boolean) => void;
  put: (url: string, params: any, tokenRequired: boolean) => void;
  delete: (url: string, params: any, tokenRequired: boolean) => void;
}

export class APITalkService implements IAPITalkService {
  async get(url: string, tokenRequired: boolean = false) {
    const token = await localStorage.getItem("token");
    if (tokenRequired) {
      return axios.get(url, {
        headers: {
          token: token!.replace(/(^"|"$)/g, ""),
        },
      });
    } else {
      return axios.get(url);
    }
  }

  async post(url: string, params: any, tokenRequired: boolean = false) {
    let token = await localStorage.getItem("token");
    if (tokenRequired) {
      return axios.post(url, params, {
        headers: {
          token: token!.replace(/(^"|"$)/g, ""),
        },
      });
    } else {
      return axios.post(url, params);
    }
  }

  async put(url: string, params: any, tokenRequired: boolean = false) {
    const token = await localStorage.getItem("token");
    if (tokenRequired) {
      return axios.put(url, params, {
        headers: {
          token: token!.replace(/(^"|"$)/g, ""),
        },
      });
    } else {
      return axios.put(url, params);
    }
  }

  async delete(url: string, params: any, tokenRequired: boolean = false) {
    const token = await localStorage.getItem("token");
    if (tokenRequired) {
      return axios.delete(url, {
        headers: {
          token: token!.replace(/(^"|"$)/g, ""),
        },
      });
    } else {
      return axios.delete(url, params);
    }
  }

  async getAxiosMultiple(
    requestArray: AxiosResponse[],
    tokenRequired: boolean
  ): Promise<AxiosResponse[]> {

    if(tokenRequired){
      const token = await localStorage.getItem("token");
      axios.defaults.headers.common['token'] = token;
      return axios.all(requestArray).then((response) => {
        return response;
      });
    } else {
      return axios.all(requestArray).then((response) => {
        return response;
      });
    }
    
  }
}
