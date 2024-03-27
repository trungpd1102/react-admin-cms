import { ComponentType, ReactElement } from 'react';
import { ReactComponent } from '@/types/general';

export type Actions = string | string[];
export interface Permission {
  actions: Actions;
  resource: string;
}

export interface PermissionProps {
  actions: Actions;
  resource: string;
  props: RecordValue;
}

export interface RoleCheckingProps {
  actions: Actions;
  action: string;
  component: ReactComponent;
  props: RecordValue;
}
