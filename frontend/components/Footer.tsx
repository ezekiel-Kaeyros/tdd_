'use client';

import React from 'react';

import axios from 'axios';
import Image from 'next/image';
import useSWR from 'swr';

import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

// import Hertz from '../public/icons/company/50hentz.svg';
// import Ampiron from '../public/icons/company/ampiron.svg';
// import Elia from '../public/icons/company/elialogo.svg';
// import HopsLogo from '../public/icons/company/hopslogo.svg';
// import PseLogo from '../public/icons/company/pselogo.svg';
// import Tennet from '../public/icons/company/tennet.svg';
// import Transnet from '../public/icons/company/transnett_btw.svg';

// import MySwiper from './notifications/MySwiper';
// import SwiperComponent from './notifications/MySwiper';

type Props = {
  _companies: any;
};

const Footer: React.FC<Props> = ({ _companies }) => {

  const scrollContainerRef: any = React.useRef(_companies); 

  // const [ newData, setNewData ] = React.useState(_companies); 

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const { data }: { data: []; error: any; isLoading: any } = useSWR (
    `${BACKEND_URL}/companies/`,
    async () => {
      const res = await axios.get(`${BACKEND_URL}/companies/`, {
        headers: {
          Authorization: `bearer ${getToken()}`,
        },
      });
      return res?.data?.tso_list;
    },
    {
      // refreshInterval: 1000,
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false
    }
  );

  // console.log(data, "jjjjjjjjjjjjjj")
  return (
    <footer className="w-full  bottom-0 flex justify-center md:w-1/2   md:mb-8  h-20">
      {/* <SwiperComponent /> */}
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        onClick={scrollLeft}
      >
        &lt;
      </button>
      <div ref={scrollContainerRef} className="no-scrollbar overflow-x-auto flex gap-3 px-4 py-4 md:flex footer justify-evenly md:justify-evenly bg-green-300 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-50 ">
        {
          data && data?.length > 0 ? 
            data?.map((image: any) => {
              return (
                <Image key={ image?.id } height={60} width={80} src={`${BACKEND_URL}/${image?.logo_path}`} alt={image?.company} />
              )
            })
            :
            <>Loading TSOs List...</>
        }
      </div>
      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        onClick={scrollRight}
      >
        &gt;
      </button>
      {/* <div className=" flex gap-3 px-4 py-4 md:flex footer justify-evenly md:justify-evenly bg-green-300 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-50 ">
        <Image width={80} src={Transnet} alt="Logo entreprise" />
        <Image width={80} src={Ampiron} alt="Logo entreprise" />
        <Image width={80} src={Tennet} alt="Logo entreprise" />
        <Image width={80} src={Hertz} alt="Logo entreprise" />
        <Image width={80} src={PseLogo} alt="Logo entreprise" />
        <Image width={80} src={HopsLogo} alt="Logo entreprise" />
        <Image width={80} src={Elia} alt="Logo entreprise" />
      </div> */}
    </footer>
  );
};

export default Footer;
