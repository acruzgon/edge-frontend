export const routes = {
  groups: '/groups',
  groupsDetail: '/groups/:uuid',
  deviceDetail: '/groups/:uuid/:inventoryId',
  canaries: '/canaries',
  fleetManagement: '/fleet-management',
  fleetManagementDetail: '/fleet-management/:groupId',
  fleetManagementSystemDetail: '/fleet-management/:groupId/systems/:deviceId',
  fleetManagementSystemDetailUpdate:
    '/fleet-management/:groupId/systems/:deviceId/update',
  inventory: '/inventory',
  inventoryDetail: '/inventory/:deviceId',
  inventoryDetailUpdate: '/inventory/:deviceId/update',
  manageImages: '/manage-images',
  manageImagesDetail: '/manage-images/:imageId',
  manageImagesDetailVersion: '/manage-images/:imageId/versions/:imageVersionId',
  repositories: '/repositories',
  learningResources: '/learning-resources',
};
