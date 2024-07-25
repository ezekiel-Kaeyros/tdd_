"use client";
import React from 'react';

import { SuperAdminContext } from '../context/admin.context';
import PageComponent from './PageComponent';

const IntermadiatePageComponent = () => {

    const { state, dispatch } = React.useContext(SuperAdminContext); 

    const [data, setData] = React.useState();

    // React.useCallback ( async () => {
    //     console.log("refreshed")
    //     // const res = await axios.get(`${BACKEND_URL}/companies/`, {
    //     //     headers: {
    //     //         Authorization: `bearer ${getToken()}`,
    //     //     },
    //     // });
    //     // setData (res?.data?.tso_list )
    //     // return res?.data?.tso_list;
    // }, [state?.refreshData])

    return (
        <PageComponent initialData={ {} } />
    )
}

export default IntermadiatePageComponent