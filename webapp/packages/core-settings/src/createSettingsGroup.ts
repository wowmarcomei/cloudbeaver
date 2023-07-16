/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { uuid } from '@cloudbeaver/core-utils';

import type { SettingsGroupType } from './SettingsManagerService';

export function createSettingsGroup(name: string): SettingsGroupType {
  return { name, id: uuid() };
}