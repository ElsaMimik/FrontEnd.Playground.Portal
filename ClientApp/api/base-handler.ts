import axios, { AxiosRequestConfig } from 'axios'

export default class HttpHandler {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async request(config: AxiosRequestConfig): Promise<any> {
    let result = await axios.create({
      baseURL: this.baseUrl
    }).request(config);
    return result;
  }
};
