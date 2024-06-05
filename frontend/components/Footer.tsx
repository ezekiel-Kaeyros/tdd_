'use client';

import Image from 'next/image';
import React from 'react';
import Hertz from '../public/icons/company/50hentz.svg';
import Ampiron from '../public/icons/company/ampiron.svg';
import Tennet from '../public/icons/company/tennet.svg';
import Elia from '../public/icons/company/elialogo.svg';
import Transnet from '../public/icons/company/transnett_btw.svg';
import HopsLogo from '../public/icons/company/hopslogo.svg';
import PseLogo from '../public/icons/company/pselogo.svg';
import MySwiper from './notifications/MySwiper';
import SwiperComponent from './notifications/MySwiper';

type Props = {
  _companies: any;
};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="w-full  bottom-0 flex justify-center md:w-1/2   md:mb-8  h-20">
      <SwiperComponent />
    </footer>
  );
};

export default Footer;
