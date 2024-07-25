import dynamic from 'next/dynamic';

// import DisplaySuperAdminForm from '../components/forms/DisplaySuperAdminForm';
import PageComponent from './PageComponent';

const DisplaySuperAdminForm = dynamic(() => import('../components/forms/DisplaySuperAdminForm'), { ssr: false });

// const PageComponent = dynamic(() => import('./PageComponent'), { ssr: false }); 

// import PageComponent from './PageComponent';


const SuperAdminPage = () => {

  return (
    <div className=''>
      <DisplaySuperAdminForm />
      <PageComponent initialData={ [] } />
      {/* <IntermadiatePageComponent /> */}
    </div>
  );
};

export default SuperAdminPage;









// import dynamic from 'next/dynamic';
// import { cookies } from 'next/headers';

// const PageComponent = dynamic(() => import('./PageComponent'), { ssr: false });

// // import PageComponent from './PageComponent';

// // const getTSOLists = async () => {
// //   let URL = `${BACKEND_URL}/companies/`;

// //   try {
// //     // Retrieving data from backend

// //     console.log("BEFORE AXIOS REQUEST")

// //     const res = await axios.get(URL, {
// //       headers: {
// //         Authorization: `Bearer ${getToken()}`,
// //       },
// //     });

// //     console.log("AFTER AXIOS REQUEST", res)

// //     let data = res?.data?.tso_list;
    
// //     console.log("data:_____", data)

// //     return data; 

// //   } catch (error) {
// //     // notifyError(`${error}`);
// //     console.log("Error", error)
// //   }
// // };

// // const makeGetReques = async () => {
// async function makeGetReques() {
//   // Get the cookies header
//   const cookiesHeader = cookies();
  
//   // Get the token from cookies
//   const token = cookiesHeader?.get("token");
//   console.log(token, "lllllllllll")
//   let URL = `http://127.0.0.1:5000/companies/`;
//   try {
//     const response: any = await fetch (
//       `${ URL }`, {
//         method: 'GET',
//         headers: {
//           Authorization: `bearer ${token}`, 
//           // 'content-type': 'application/json', 
//           // 'Access-Control-Allow-Origin': '*'
//         }, 
//         // mode: 'no-cors'
//       }
//     )

//     const result =  await response?.tso_list

//     console.log("result33333333333333333", result)
//     return result
//   } catch (error) {
//     // alert(`Something went wrong (${error})`); 
//     console.log(`Something went wrong (${error})`)
//     return error
//   }
// }

// const SuperAdminPage = async () => {

//   const initialData = await makeGetReques ()

//   console.log(initialData, ">>>>>>>>>>>>")

//   return (
//     <div>
//       <PageComponent initialData={ [] } />
//     </div>
//   );
// };

// export default SuperAdminPage;
