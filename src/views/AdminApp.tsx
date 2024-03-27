'use client';

import { Admin, Resource } from 'react-admin';

import dataProvider from '../providers/dataProviders/dataProvider';
import authProvider from '../providers/authProvider';
import { Permission } from '@/types/roles';
import React from 'react';
import { checkRole } from './_core/permissions';

// Define resources
import ResourceMap from './_core/resources';

const AdminApp = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      {(permissions: Permission[]) =>
        permissions.map((permission: Permission) => {
          const { resource: pemissionResource, actions } = permission;

          const { list, edit, create, show, icon, resource } =
            ResourceMap[pemissionResource];

          const props = { resource, actions };

          return (
            <Resource
              key={resource}
              name={resource}
              list={checkRole({
                actions,
                action: 'list',
                component: list,
                props,
              })}
              show={checkRole({
                actions,
                action: 'show',
                component: show,
                props,
              })}
              edit={checkRole({
                actions,
                action: 'edit',
                component: edit,
                props,
              })}
              create={checkRole({
                actions,
                action: 'create',
                component: create,
                props,
              })}
              icon={icon}
            />
          );
        })
      }
    </Admin>
  );
};

export default AdminApp;
