import { Typography, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logoSrc from 'src/assets/images/loading.gif';
import loadingStyle from './loading.style';

const Loading = ({ title }: { title?: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div className={loadingStyle(theme)}>
      <Typography align="center" variant="h4" gutterBottom>
        {title ?? t('loadingTitle')}
      </Typography>
      <Typography align="center" variant="subtitle1">
        {t('loadingSubTitle')}
      </Typography>
      <img src={logoSrc} alt="logo" className="logo" />
    </div>
  );
};

export default Loading;
