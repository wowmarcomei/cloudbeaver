/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import styled, { css } from 'reshadow';

import { InlineEditor } from '@cloudbeaver/core-app';
import { useTranslate } from '@cloudbeaver/core-localization';
import { composes, useStyles } from '@cloudbeaver/core-theming';

import type { DataModelWrapper } from '../DataModelWrapper';

const styles = composes(
  css`
    InlineEditor {
      composes: theme-background-surface theme-text-on-surface from global;
    }
  `,
  css`
    SubmittingForm {
      height: 40px;
      flex: 1;
      display: flex;
      align-items: center;
    }
    InlineEditor {
      flex: 1;
      height: 24px;
      margin: 0 12px;
    }
  `
);

interface Props {
  context: DataModelWrapper;
}

export const TableWhereFilter = observer(function TableWhereFilter({
  context,
}: Props) {
  const translate = useTranslate();
  const [filterValue, setValue] = useState(() => context.source.options?.whereFilter || '');

  const handleApply = useCallback(() => {
    if (context.isLoading()) {
      return;
    }
    context.source.options!.whereFilter = filterValue;
    context.refresh();
  }, [context, filterValue]);

  const resetFilter = useCallback(() => {
    if (context.isLoading()) {
      return;
    }
    const applyNeeded = context.source.options?.whereFilter === filterValue;

    setValue('');

    if (applyNeeded) {
      context.source.options!.whereFilter = '';
      context.refresh();
    }
  }, [context, filterValue]);

  return styled(useStyles(styles))(
    <InlineEditor
      name="data_where"
      value={filterValue}
      placeholder={translate('table_header_sql_expression')}
      controlsPosition='inside'
      edited={!!filterValue}
      disabled={context.isLoading() || context.results.length > 1}
      simple
      onSave={handleApply}
      onUndo={resetFilter}
      onChange={setValue}
    />
  );
});
