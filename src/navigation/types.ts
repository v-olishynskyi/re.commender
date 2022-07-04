import React from 'react';

export type RouteRype = {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
};
