"use client"
import React, { useEffect, useState } from 'react';
import { db } from './firebase'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'


export interface studentObj {
  id: number,
  Email: string,
  Name: string,
  Number: number,
}
function Page() {
  const [name, setName] = useState(" ");
  const [Phone, setPhone] = useState(" ");
  const [Email, setEmail] = useState(" ")

  const [fetchData, setFetchData] = useState<studentObj[]>([]);

  const [studentId, setId] = useState<number>();

  // Creating Database Reference

  const dbref = collection(db, "Data") as any;

  const AddData = async () => {
    if (name.length === 0 || Phone.length === 0 || Email.length === 0) {
      alert(" please fill all the fildes")
    }
    else {
      try {
        await addDoc(dbref, { Name: name, Number: Phone, Email: Email })
        alert(" Data Added Successfully")
        setName("");
        setPhone("");
        setEmail("");
        fetchdata();

      }
      catch (error) {
        alert(error)

      }
    }

  }
  // fetching the data from database 

  useEffect(() => {
    fetchdata()
  },[])

  // handling fetch data function 

  const fetchdata = async () => {
    const getdata = await getDocs(dbref)
    const snap: any = getdata.docs.map((doc) => ({ id: doc.id, ...doc.data() as any }))
    setFetchData(snap)
  }


  const editData = (id: number) => {

    const filter: any = fetchData.find((filterID: { id: number }) => {
      return filterID.id === id
    })
    setId(filter.id)
    setName(filter.Name)
    setEmail(filter.Email)
    setPhone(filter.Number)
  }

  const Update = async () => {
    if (name.length === 0 || Phone.length === 0 || Email.length === 0) {
      alert(" please fill all the fildes")
    }
    else {
      try {
        if (dbref) {
          const updateref = doc(dbref, studentId as any)
          await updateDoc(updateref, { Name: name, Number: Phone, Email: Email })
          alert("Data updated successfully")
          setName(" ")
          setPhone(" ")
          setEmail(" ");
          setId(undefined);
          fetchdata()
        }
      }
      catch (error) {

        alert(error)
      }
    }
  }

  const deleteData = async (id: number) => {
    const delref = doc(dbref, id as any)
    await deleteDoc(delref)
    alert("Data Delete Successfully")
    fetchdata()
  }
  return (
    <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16"'>
      <h2 className="mx-auto max-w-3xl m-10 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">Student Form</h2>
      <div className=''>
        <div className='className="grid gap-4 sm:grid-cols-2 sm:gap-6"'>
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block mb-2 m-3 text-sm font-medium dark:text-white">Student Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="block mb-2 m-3 text-sm font-medium text-gray-900 dark:text-white">Student Phone Number</label>
            <input type="text" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 m-3 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
            <input type="email" name="email" value={Email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
        </div>
        { studentId ? 
         <button onClick={Update} className="inline-flex items-center bg-white px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium  text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Update
       </button> : 
          <button onClick={AddData} className="inline-flex items-center bg-white px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Add Data
          </button>
        }
      </div>
      <div className=''>
        <h3 className="mx-auto max-w-3xl m-10 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">Student Data</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                   Number
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Email
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            {fetchData.map((data) => {
              return (
                <tbody key={data.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <h4>{data.Name}</h4>
                    </th>
                    <td className="px-6 py-4">
                      <h4>{data.Number}</h4>
                    </td>
                    <td className="px-6 py-4">
                      <h4>{data.Email}</h4>
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium mr-4 text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editData(data.id)}>Edit</button>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteData(data.id)}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              )
            })
            }
          </table>
        </div>
      </div>
    </div>
  );
}
export default Page;
