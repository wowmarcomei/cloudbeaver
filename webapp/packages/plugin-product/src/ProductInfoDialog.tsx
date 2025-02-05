/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { observer } from 'mobx-react-lite';

import {
  Button,
  ColoredContainer,
  CommonDialogBody,
  CommonDialogFooter,
  CommonDialogHeader,
  CommonDialogWrapper,
  FormFieldDescription,
  Group,
  IconOrImage,
  Link,
  s,
  TextPlaceholder,
  useS,
  useTranslate,
} from '@cloudbeaver/core-blocks';
import { useService } from '@cloudbeaver/core-di';
import type { DialogComponentProps } from '@cloudbeaver/core-dialogs';
import { ProductInfoResource } from '@cloudbeaver/core-root';
import { ThemeService } from '@cloudbeaver/core-theming';
import { useAppVersion } from '@cloudbeaver/core-version';
import { WebsiteLinks } from '@cloudbeaver/core-website';

import ProductInfoDialogStyles from './ProductInfoDialog.module.css';

export const ProductInfoDialog = observer<DialogComponentProps<null>>(function ProductInfoDialog(props) {
  const translate = useTranslate();
  const serverConfigResource = useService(ProductInfoResource);
  const themeService = useService(ThemeService);

  const version = useAppVersion();

  const productInfo = serverConfigResource.data;
  const logoIcon = themeService.themeId === 'light' ? '/icons/product-logo_light.svg' : '/icons/product-logo_dark.svg';

  const styles = useS(ProductInfoDialogStyles);

  return (
    <CommonDialogWrapper size="large">
      <CommonDialogHeader title="app_product_info" onReject={props.rejectDialog} />
      <CommonDialogBody>
        <ColoredContainer>
          <Group gap compact box>
            {!productInfo ? (
              <TextPlaceholder>{translate('app_product_info_placeholder')}</TextPlaceholder>
            ) : (
              <>
                <IconOrImage className={s(styles, { iconOrImage: true })} icon={logoIcon} />
                <FormFieldDescription className={s(styles, { formFieldDescription: true })} label={translate('app_product_info_name')}>
                  {productInfo.name}
                </FormFieldDescription>
                <FormFieldDescription className={s(styles, { formFieldDescription: true })} label={translate('app_product_info_description')}>
                  {productInfo.description}
                </FormFieldDescription>
                <FormFieldDescription className={s(styles, { formFieldDescription: true })} label="Backend version">
                  {productInfo.version}
                </FormFieldDescription>
                <FormFieldDescription className={s(styles, { formFieldDescription: true })} label="Frontend version">
                  {version.frontendVersion}
                </FormFieldDescription>
                <FormFieldDescription className={s(styles, { formFieldDescription: true })} label={translate('app_product_info_contacts')}>
                  <div className={s(styles, { contactsInfo: true })}>
                    You can contact us via our
                    <Link href={WebsiteLinks.CONTACT_PAGE} target="_blank" rel="noopener noreferrer">
                      {' '}
                      Site{' '}
                    </Link>
                    or
                    <Link href={WebsiteLinks.GITHUB_REPOSITORY_PAGE} target="_blank" rel="noopener noreferrer">
                      {' '}
                      Github
                    </Link>
                  </div>
                </FormFieldDescription>
              </>
            )}
          </Group>
        </ColoredContainer>
      </CommonDialogBody>
      <CommonDialogFooter className={s(styles, { commonDialogFooter: true })}>
        <Button type="button" mod={['outlined']} onClick={props.rejectDialog}>
          {translate('ui_processing_ok')}
        </Button>
      </CommonDialogFooter>
    </CommonDialogWrapper>
  );
});
