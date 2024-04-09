import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const BASE_URL = 'http://localhost:8000';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const mutex = new Mutex();

const customFetchBase = async (args, api, extraOptions) => {
  // Wait for any ongoing auth refresh to complete
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // If the user is not logged in, try to refresh the token
  if (result.error?.data?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: '/api/auth/refresh', credentials: 'include' },
          api,
          extraOptions
        );
        
        if (refreshResult.data) {
          // Retry the original query after a successful refresh
          result = await baseQuery(args, api, extraOptions);
        } // If refresh failed, do not logout, continue with the original result
      } finally {
        release();
      }
    } else {
      // Wait for the mutex if it's locked by another instance and retry the query
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // Return the result whether or not the user is logged in
  return result;
};

export default customFetchBase;
