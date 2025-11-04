/**
 * Defines the constant base paths for navigation.
 */
export const AppRoutes = {
  HOME: '/',
  FARES: '/fares',
  PAYMENT: '/payment',
  TICKET: '/ticket',
} as const;

export type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];

/**
 * Defines the exact string keys used for URL search parameters.
 * This ensures consistency and prevents typos.
 */
export const ParamKeys = {
  LANGUAGE: 'lang',
  TIME_FROM: 'timeFrom',
  TIME_TO: 'timeTo',
  START_STATION: 'startId',
  END_STATION: 'endId',
  ROUTE_ID: 'routeId'
} as const;

export type ParamKey = typeof ParamKeys[keyof typeof ParamKeys];

export type GlobalParams = {
  [ParamKeys.LANGUAGE]?: string;
}

export type FaresParams = {
  [ParamKeys.TIME_FROM]?: string;
  [ParamKeys.TIME_TO]?: string;
  [ParamKeys.START_STATION]?: string;
  [ParamKeys.END_STATION]?: string;
};

export type PaymentParams = {
  [ParamKeys.ROUTE_ID]?: string;
  [ParamKeys.START_STATION]?: string;
  [ParamKeys.END_STATION]?: string;
};

export type RouteParamsMap = {
  [AppRoutes.FARES]: FaresParams;
  [AppRoutes.HOME]: Record<string, never>;
  [AppRoutes.PAYMENT]: PaymentParams;
  [AppRoutes.TICKET]: Record<string, never>;
};

/**
 * Safely constructs a complete URL path with type-checked query parameters.
 *
 * @param path The base route path (must be one of AppRoutes values).
 * @param params The specific parameters required by that route.
 * @param globalParams
 * @returns The fully constructed URL string (e.g., /fares?time=2025-11-04).
 */
export function buildRoute<T extends AppRoute>(
    path: T,
    params?: RouteParamsMap[T],
    globalParams?: GlobalParams,
): string {
  const allParams = { ...params, ...globalParams };

  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams();

  for (const key in allParams) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = allParams[key as keyof typeof allParams];

      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    }
  }
  return `${path}?${searchParams.toString()}`;
}