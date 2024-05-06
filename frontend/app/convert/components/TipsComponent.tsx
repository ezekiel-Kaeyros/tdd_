'use client';
import React, { useContext, useEffect } from 'react';
import ReactJoyride from 'react-joyride';
import { FileContext } from '../context/file.context';

const TipsComponent = () => {
  const { state, dispatch } = useContext(FileContext);
  const stepsConvert = [
    {
      target: '.header > h3',
      content: 'Welcome!! Here you',
    },
    {
      target: '.fileUpload',
      content: 'Here you can upload the files to convert them',
    },

    {
      target: '.footer',
      content: 'You can view a list of different TSOs',
    },
    {
      target: '.profile',
      content:
        'You can have access to the settings (admin only) and logout here',
    },
    {
      target: '.tips',
      content: 'If you need help, you can just click on this icon',
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      localStorage.setItem('tour', 'true');
      dispatch({ type: 'ACTIVATE_TIPS', payload: true });
    } else {
      dispatch({ type: 'ACTIVATE_TIPS', payload: false });
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <ReactJoyride
        steps={stepsConvert}
        hideBackButton={true}
        showSkipButton={true}
        continuous={true}
        run={state.tipsTour ? true : false}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#4FA983',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            textColor: '#333',
          },
        }}
        locale={{ next: 'Next', last: 'Close' }}
      />
    </main>
  );
};

export default TipsComponent;
