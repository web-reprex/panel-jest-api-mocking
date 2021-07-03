import { Component } from 'react';
export enum RoleAccessLevel {
  God = 0,
  SuperAdmin = 1,
  Admin = 2,
  User = 10,
  Viewer = 11
}
export interface Route {
  path: string;
  name: string;
  component: Component | CallableFunction;
  exact: boolean;
  meta: RouteMeta;
}
export interface RouteMeta {
  requiredLevel: RoleAccessLevel;
  icon: string;
  title: string;
}
