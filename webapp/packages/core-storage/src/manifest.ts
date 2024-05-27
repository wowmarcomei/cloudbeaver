/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { PluginManifest } from '@cloudbeaver/core-di';

export const coreStorageManifest: PluginManifest = {
  info: {
    name: 'Core Storage',
  },

  providers: [() => import('./StorageService').then(m => m.StorageService)],
};