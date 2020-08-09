import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export const navigationRef: any = React.createRef<typeof NavigationContainer>();

export default class NavigationService {
  navigate = (name: string, params: {}) => navigationRef.current?.navigate(name, params);
  goBack = () => navigationRef.current?.goBack();
  canGoBack = () => navigationRef.current?.canGoBack();
  reset = (...args) => navigationRef.current?.reset(...args);
  addListener = (...args) => navigationRef.current?.addListener(...args);
}
