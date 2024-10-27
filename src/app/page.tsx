"use client"
import React, { useEffect, useState } from 'react';
import { db } from './firebase'
import {collection , addDoc , getDocs , updateDoc, doc , deleteDoc} from 'firebase/firestore' 


function Page() {


// Handling User Input -----------------------------------------------------------------

  const [name,setName]=useState(" ")
  const [Phone,setPhone]=useState(" ")
  const [Email,setEmail]=useState(" ")


// handling the fetch data ------------------------------------------------------

  const[fetchData, setFetchData]= useState([])

// handling the specfic ID in useState----------------------------------------------------
  const[id,SetId] = useState({})

// Creating Database Reference ----------------------------------------------

  const dbref = collection(db,"Data")


//  Handle Add Function ---------------------------------------------------------------

const AddData = async () =>
  {
  if (name.length === 0 || Phone.length === 0 || Email.length === 0 )
    {
      alert(" please fill all the fildes") 
  }
  else
  {
    try 
    {
      await addDoc(dbref, { Name:name , Number:Phone , Email:Email } )
      alert(" Data Added Successfully")
      setName(" ")
      setPhone(" ")
      setEmail(" ")
      fetchdata()

    } 
    catch (error)
    {
      alert(error) 
      
    }
  }

}
// fetching the data from database  -------------------------------------------

useEffect(()=>
  {
    fetchdata()
},[])

// handling fetch data function -----------------------------------------------------

const fetchdata = async () =>
 {
  const getdata = await getDocs(dbref)
  const snap = getdata.docs.map((doc) => ({id:doc.id, ...doc.data()}))
  setFetchData(snap)
   }

// Handling Edit Function -----------------------------------------------------------

const Edit = (id) => 
  {
// finding the user specifi data from fetchData using ID -------------------------------------------

  const filter = fetchData.find((filterID) =>
   {
   return filterID.id === id 
  })
   SetId(filter.id)
   setName(filter.Name)
   setEmail(filter.Email)
   setPhone(filter.Number)
   
}

// Handling the update Function

const Update = async ()=>
  {    
    if (name.length === 0 || Phone.length === 0 || Email.length === 0 )
    {
        alert(" please fill all the fildes") 
           }
    else
 {
  // create the update document reference -----------------------------------------------------

       const updateref = doc(dbref, id)
     try 
  {
        await updateDoc( updateref, { Name:name , Number:Phone , Email:Email }  ) 
      alert("Student updated successfully")
      fetchdata()
      }     
      catch (error)       {
        
        alert(error)
      }
   }
   }


// Handling Delete function ----------------------------------------------------------------

const del = async (id)=>
     {
// creating the reference of deleting document---------------------------------------
        const delref = doc(dbref,id)
     const delDoc = await deleteDoc(delref)
        alert("Document Delete Successfully")
   fetchdata()

   }
  return (

    <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16"'>
       <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Student</h2>
      <div className=''>
     
        <div className='className="grid gap-4 sm:grid-cols-2 sm:gap-6"'>
        <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                  <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
            </div>
        <div className="w-full">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Phone Number</label>
                  <input type="text" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
               </div>
        <div className="w-full">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
                  <input type="email" name="email" value={Email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                </div>
                
            </div>
            <button onClick={AddData} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                 Add Data
        </button>

        <button onClick={Update} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                 Update
        </button>
  
      </div>

    <div className=''>
       <h3> Student Data</h3>
       <div className=''>
       {
         fetchData.map((data) => 
          {
            return(
              <>
              <div>
              <h4>Name : {data.Name}</h4>
              <h4>Number : {data.Email}</h4>
              <h4>Email : {data.Number}</h4>
              <div>
                <button onClick={()=>Edit(data.id)}>Edit</button>
                <button onClick={()=>del(data.id)}>Delete</button>
              </div>

              </div>

              </>
            )
          })
        }

      </div>
      </div> 
      </div>
  );
}

 export default Page;
