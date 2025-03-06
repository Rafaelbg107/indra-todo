import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { errorRequest, makeRequest, setData, successRequest } from '../reducer/apiSlice';
import axios from 'axios';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ApiRequestOptions = {
  url: string;
  method?: HttpMethods
  body?: any;
  headers?: Record<string, string>;
}

export const useApiRequest = <T>({ url, method = 'GET', body, headers }: ApiRequestOptions) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, isError } = useAppSelector((state) => state.api);

  useEffect(() => {
		(async () => {
			await fetchData();
		})()
  }, [url, method, body, dispatch]);

	const fetchData = async () => {
		dispatch(makeRequest());

		try {
			const response = await axios({
				method,
				url,
				data: body,
				headers,
			})

			if (response.status < 200 || response.status >= 300) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			let responseData: T = response.data

			dispatch(successRequest(responseData));
		} catch (err: any) {
			dispatch(errorRequest(err.message));
		}
	};

	const setNewData = (newData: T) => {
		dispatch(setData(newData))
	}

  return { data, isLoading, error, isError, setNewData };
};
