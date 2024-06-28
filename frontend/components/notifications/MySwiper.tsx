// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import React from 'react';

import axios from 'axios';
import Image from 'next/image';
// import required modules
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
} from 'swiper/modules';
// Import Swiper React components
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';
import useSWR from 'swr';

import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

export default function App() {
  const { data, error, isLoading }: { data: []; error: any; isLoading: any } =
    useSWR(
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
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loopAddBlankSlides={true}
        cssMode={true}
        slidesPerView={6}
        speed={5000}
        grabCursor={true}
        loopAdditionalSlides={6}
        modules={[Autoplay, Pagination, Navigation, FreeMode]}
        className="mySwiper"
      >
        {data?.length === 0 ? (
          <>Loading TSOs List...</>
        ) : (
          data?.map((tso: any) => {
            console.log(tso);

            return (
              <SwiperSlide key={tso.logo_path}>
                <Image
                  src={`${BACKEND_URL}/${tso?.logo_path}`}
                  alt="Logo"
                  width={80}
                  height={70}
                  title={tso.company}
                  className=" object-cover md:w-[82px] md:h-16 w-full h-full "
                />
              </SwiperSlide>
            );
          })
        )}
        {data?.length === 0 ? (
          <>Loading ...</>
        ) : (
          data?.map((tso: any) => {
            console.log(tso);

            return (
              <SwiperSlide key={tso.logo_path}>
                <Image
                  src={`${BACKEND_URL}/${tso?.logo_path}`}
                  alt="Logo"
                  width={100}
                  height={70}
                  title={tso.company}
                  className=" object-cover md:w-[82px]  md:h-16 w-full h-full"
                />
              </SwiperSlide>
            );
          })
        )}
        {data?.length === 0 ? (
          <>Loading ...</>
        ) : (
          data?.map((tso: any) => {
            console.log(tso);

            return (
              <SwiperSlide key={tso.logo_path}>
                <Image
                  src={`${BACKEND_URL}/${tso?.logo_path}`}
                  alt="Logo"
                  width={100}
                  height={70}
                  title={tso.company}
                  className=" object-cover md:w-[82px] md:h-16 w-full h-full"
                />
              </SwiperSlide>
            );
          })
        )}

        {data?.length === 0 ? (
          <>Loading ...</>
        ) : (
          data?.map((tso: any) => {
            console.log(tso);

            return (
              <SwiperSlide key={tso.logo_path}>
                <Image
                  src={`${BACKEND_URL}/${tso?.logo_path}`}
                  alt="Logo"
                  width={100}
                  height={70}
                  title={tso.company}
                  className=" object-cover md:w-[82px] md:h-16 w-full h-full"
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </>
  );
}
