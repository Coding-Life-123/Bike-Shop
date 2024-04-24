import React from "react";


function showDetails(num){
  document.getElementById(`${num}`).style.display="block";
}

function hideDetails(num){
  document.getElementById(`${num}`).style.display="none"  
}



function BikeComponent({BikeData, setBikePage}) {
  
  return (
    <div className="flex justify-center items-center mx-4 px-4">
      <div className='inline-block justify-center items-center w-[1800px] sm:w-[600px] md:w-[700px] lg:w-[960px] xl:w-[1200px] 2xl:w-[1880px] mx-auto'>
        {BikeData.map((element) => (
          <div
            key={element.BikeID}
            className="w-[300px] bg-[rgb(100,100,100)] text-[rgb(200,200,200)] inline-block cursor-pointer hover:overflow- hover:border-[2px] hover:shadow-2xl hover:shadow-blue-600 align-top mx-5 my-5 py-3 px-5 rounded-2xl"
            onMouseEnter={() => showDetails(element.BikeID)}
            onMouseLeave={() => hideDetails(element.BikeID)}
            onClick={() => setBikePage(element.BikeID)}
          >
            <div className="w-60 flex justify-center">
              <img
                src={element.Image}
                alt={element.Name + "image"}
                className="w-60 h-44 overflow-hidden  object-cover mx-auto items-center justify-center align-middle "
              />
            </div>

            <div id="name" className="font-medium flex *:text-lg space-x-1">
              <h1>{element.Brand}</h1>
              <h1>{element.Name}</h1>
            </div>

            
            <div id={element.BikeID} className="hidden *:text-[17px]">
              <p><span className="font-bold">CC: </span>{element.EngineCC}cc</p>
              <p><span className="font-bold">Power: </span>{element.PowerHP}hp</p>
              <p><span className="font-bold">Weight: </span>{element.DryWeight}Kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>   
  );
}

export default BikeComponent;
