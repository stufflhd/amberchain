import React from 'react';
import { useTranslation } from 'react-i18next';

const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex items-center justify-center z-40 relative">
      <div className="flex flex-col items-center gap-8">
        <div className="loadingPBoxes">
          <div className="loadingPBox loadingPBox1">
            <div className="loadingPBox-face loadingPBox-face-front" />
            <div className="loadingPBox-face loadingPBox-face-right" />
            <div className="loadingPBox-face loadingPBox-face-top" />
            <div className="loadingPBox-face loadingPBox-face-shadow" />
          </div>
          <div className="loadingPBox loadingPBox2">
            <div className="loadingPBox-face loadingPBox-face-front" />
            <div className="loadingPBox-face loadingPBox-face-right" />
            <div className="loadingPBox-face loadingPBox-face-top" />
            <div className="loadingPBox-face loadingPBox-face-shadow" />
          </div>
          <div className="loadingPBox loadingPBox3">
            <div className="loadingPBox-face loadingPBox-face-front" />
            <div className="loadingPBox-face loadingPBox-face-right" />
            <div className="loadingPBox-face loadingPBox-face-top" />
            <div className="loadingPBox-face loadingPBox-face-shadow" />
          </div>
          <div className="loadingPBox loadingPBox4">
            <div className="loadingPBox-face loadingPBox-face-front" />
            <div className="loadingPBox-face loadingPBox-face-right" />
            <div className="loadingPBox-face loadingPBox-face-top" />
            <div className="loadingPBox-face loadingPBox-face-shadow" />
          </div>
        </div>
        <div className="text-center mt-12">
          <span className="opacity-70">{t('loader.title')}</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;