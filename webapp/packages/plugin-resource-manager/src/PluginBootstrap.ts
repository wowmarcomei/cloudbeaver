/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2022 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { EMainMenu, MainMenuService } from '@cloudbeaver/core-app';
import { AuthInfoService } from '@cloudbeaver/core-authentication';
import { Bootstrap, injectable } from '@cloudbeaver/core-di';
import { SideBarPanelService } from '@cloudbeaver/core-ui';

import { ResourceManager } from './ResourceManager';
import { ResourceManagerService } from './ResourceManagerService';

@injectable()
export class PluginBootstrap extends Bootstrap {
  constructor(
    private readonly mainMenuService: MainMenuService,
    private readonly authInfoService: AuthInfoService,
    private readonly resourceManagerService: ResourceManagerService,
    private readonly sideBarPanelService: SideBarPanelService,
  ) {
    super();
  }

  register(): void | Promise<void> {
    this.mainMenuService.registerMenuItem(
      EMainMenu.mainMenuToolsPanel,
      {
        id: 'resourceManagementTrigger',
        order: 3,
        type: 'checkbox',
        title: 'plugin_resource_manager_title',
        isHidden: () => !this.authInfoService.userInfo,
        isChecked: () => this.resourceManagerService.enabled,
        onClick: this.resourceManagerService.toggleEnabled,
      }
    );

    this.sideBarPanelService.tabsContainer.add({
      key: 'resource-manager-tab',
      order: 0,
      name: 'plugin_resource_manager_title',
      isHidden: () => !this.authInfoService.userInfo || !this.resourceManagerService.enabled,
      onClose: this.resourceManagerService.toggleEnabled,
      panel: () => ResourceManager,
    });
  }

  async load(): Promise<void> { }
} 