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

type Props = {
  _companies: any;
};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="w-full footer bottom-0 flex justify-center md:w-full md:flex md:justify-center absolute md:mb-8 ">
      <div className="w-2/3 flex py-4 md:w-2/4 md:flex footer justify-evenly md:justify-evenly bg-green-300 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-50 ">
        <Image width={80} src={Transnet} alt="Logo entreprise" />
        <Image width={80} src={Ampiron} alt="Logo entreprise" />
        <Image width={80} src={Tennet} alt="Logo entreprise" />
        <Image width={80} src={Hertz} alt="Logo entreprise" />
        <Image width={80} src={PseLogo} alt="Logo entreprise" />
        <Image width={80} src={HopsLogo} alt="Logo entreprise" />
        <Image width={80} src={Elia} alt="Logo entreprise" />
      </div>
    </footer>
  );
};

export default Footer;
