import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { http } from '../../../../../lib/http/axios';
import { ListingContext } from '../../../../../Context/ListingContext';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Select_location() {
  const {setNext , listingdata ,setListingData} = useContext(ListingContext)
const [ads , setAds] =useState({
  country:'',
  division:'',
  district:'',
  upozila:''
})
const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };


if(ads.country=="" || ads.division=="" || ads.district=="" || ads.upozila==""){
  setNext(false)
}else{
setTimeout(() => {
  setListingData({...listingdata ,location: JSON.stringify(ads) })
  setNext(true)
}, 100);

}

const options = [
  {value:"Bangladesh" , label:"Bangladesh"},

 ];


  const [locationdata ,setLocatoinData]=useState()
 useEffect(()=>{
  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        const longitude = loc.coords.longitude;
        const latitude = loc.coords.latitude;
        const geoapi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ban`

    
    
          fetch(geoapi)
          .then(res => res.json())
          .then(result => { setLocatoinData(result);
            console.log(result)
           })
  
      })

   
    }
  }



  location();
  GetDistrict()
  GetDivison()
  GetUpazila()
 },[])

// -------------------- get geo info
const [dis ,setDis] = useState('')
const [div , setDiv] =useState('')
const [Upa ,setUpa] =useState('')
const GetDistrict = async ()=>{
   http.get('get-district')
   .then(res=>{
           setDis(res.data)
           
   }).catch(err=>console.log(err.message))
}

const GetDivison = async ()=>{
  http.get('get-division')
  .then(res=>{
          setDiv(res.data)
        
  }).catch(err=>console.log(err.message))
}

const GetUpazila = async ()=>{
  http.get('get-upazila')
  .then(res=>{
          setUpa(res.data)
        
  }).catch(err=>console.log(err.message))
}
  return (
    <div className='ese-anim text-center w-full p-3'>

<div className="flex items-center gap-5">
  <div className="flex border border-slate-800 rounded-lg px-3 py-1 items-center gap-1 text-xl"><input type="checkbox"   /> Same as my location</div>
<button className='py-1 mr-4 px-4  rounded-lg  text-center  bg-blue-500 text-white'>  Detect Location</button>
</div>
      <div className=" grid grid-cols-2 border gap-2 p-2 py-4 w-full rounded-lg mt-3 ">


        {/* optons */}



        <div className='border rounded-lg flex px-1 flex-col'>
          <lable className="py-2 text-left text-xl font-bold text-slate-600 px-3">Country</lable>
        <Select
          options={options}
          onChange={(items)=>{setAds({...ads , country: items.label})}}
         isSearchable={true}
        
        />
        </div>
        <div className='border rounded-lg flex px-1 flex-col'>
          <lable className="py-2 text-left text-xl font-bold text-slate-600 px-3">Divission</lable>
          <Select
          options={div}
          onChange={(items)=>{setAds({...ads , division: items.label})}}
         isSearchable={true}
         isLoading={div? false : true}
        
        />
        </div>
        <div className='border rounded-lg flex px-1 flex-col'>
          <lable className="py-2 text-left text-xl font-bold text-slate-600 px-3">District</lable>
          <Select
          options={dis}
          onChange={(items)=>{setAds({...ads , district: items.label})}}
         isSearchable={true}
         isLoading={dis? false : true}
        
        />
        </div>
        <div className='border rounded-lg flex px-1 flex-col'>
          <lable className="py-2 text-left text-xl font-bold text-slate-600 px-3">Upozilla</lable>
          <Select
          options={Upa}
          onChange={(items)=>{setAds({...ads , upozila: items.label})}}
         isSearchable={true}
         isLoading={Upa? false : true}
        
        />
        </div>





      

       

    




      </div>
     
      <br />

      <div>
<div className="py-2 map">
<GoogleMapReact
   
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
</div>
      </div>



    </div>
  )
}

export default Select_location
