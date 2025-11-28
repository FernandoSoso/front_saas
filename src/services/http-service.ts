import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse,} from 'axios';

/**
 * Classe base para serviços HTTP.
 * Encapsula a configuração do Axios e os métodos de requisição.
 * Deve ser estendida por serviços específicos da aplicação.
 */
abstract class HttpService {
    protected readonly axiosInstance: AxiosInstance;
    protected constructor() {
        this.axiosInstance = axios.create({
            baseURL: `http://localhost:8055`,
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('Erro na requisição HTTP:', error);
                return Promise.reject(error);
            },
        );
    }

    protected get<T = any, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.axiosInstance.get<T, R>(url, config);
    }

    protected post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.axiosInstance.post<T, R>(url, data, config);
    }

    protected put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.axiosInstance.put<T, R>(url, data, config);
    }

    protected patch<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.axiosInstance.patch<T, R>(url, data, config);
    }

    protected delete<T = any, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.axiosInstance.delete<T, R>(url, config);
    }
}

export default HttpService;
