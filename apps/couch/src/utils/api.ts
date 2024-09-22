import { type ExceptionContextType, type ExceptionToastProps } from '@/contexts/error';
import { LOCAL_STORAGE_SHELF_KEY, type ShelfContextState, type ShelfContextType } from '@/contexts';
import axios, { type AxiosInstance } from 'axios';
import { isServer } from './iso';
import { v4 as uuidv4 } from 'uuid';

interface ApiResponseType<T> {
  ok: boolean;
  data: T | null;
  error?: string | null;
}

interface ShelfApiClientOptions {
  net: AxiosInstance;
}

class ShelfApiClient {
  private readonly net: AxiosInstance;
  private readonly __defaultFailToCreateException = 'FailedCreateShelfException';
  private getToastOnFailToCreate(exception: string): ExceptionToastProps {
    switch (exception) {
      case this.__defaultFailToCreateException:
      default:
        return {
          id: 'default_failed_to_create_shelf_exception',
          error: 'default_failed_to_create_shelf_exception_error_text',
          cause: 'default_failed_to_create_shelf_exception_cause_text'
        };
    }
  }

  constructor(options: ShelfApiClientOptions) {
    this.net = options.net;
  }

  public async create(
    update: ShelfContextType['update'],
    dispatchError: ExceptionContextType['dispatchException']
  ): Promise<void> {
    try {
      const uuid = uuidv4();
      const { data, status } = await this.net.get<ApiResponseType<ShelfContextState>>(
        `/shelf/create?uuid=${uuid}`
      );
      const hasFailed = data == null || !data.ok || !data.data || status < 200 || status > 201 || data.error;
      if (hasFailed) {
        throw new Error(data.error ?? this.__defaultFailToCreateException);
      } else {
        update({ ...data.data });
        if (!isServer()) {
          window.localStorage.setItem(LOCAL_STORAGE_SHELF_KEY, JSON.stringify({ ...data.data }));
        }
      }
    } catch (e: unknown) {
      dispatchError(this.getToastOnFailToCreate((e as Error).message));
    }
  }
}

class Api {
  private readonly net = axios.create({
    baseURL: process.env.VERCEL_PRODUCTION_EF_API_URL,
    timeout: 1500,
    withCredentials: true,
    headers: {
      Accept: 'text/html, application/json, image/webp, image/jpg, image/png, */*;q=0.1',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  });

  public Shelf = new ShelfApiClient({ net: this.net });
}

let api: Api;

export function getApi(): Api {
  if (!api) {
    api = new Api();
  }
  return api;
}
