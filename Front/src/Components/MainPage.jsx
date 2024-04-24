import React, { useState } from "react";
import BikeComponent from "./BikeComponent";
import PageComponent from "./PageComponent";

var Data = await fetch("http://localhost:3000/data", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => (Data = data));

Data.map((elemento) => console.log(elemento));

function MainPage() {
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [typeData, setTypeData] = useState();
  const [recentElement, setRecentElement] = useState();
  const [bikePage, setBikePage] = useState(false);
  const [bikeData, setBikeData] = useState();

  const bikePageFunc = async(id) => {
    const response = await fetch(
      `http://localhost:3000/get-bike/${id}`,
      {
        method: "GET"
      }
    )
    const BikeData = await response.json();
    setBikeData(BikeData)
    console.log(id)
    setBikePage(true)
  }

  const filterByType = async (filter, type) => {
    const response = await fetch(
      `http://localhost:3000/get-data/${type}/${filter}`,
      {
        method: "GET",
      }
    );
    const TypeData = await response.json();
    setTypeData(TypeData);
    setIsDataFiltered(true);
  };

  const filterByCost = async (max, min) => {
    const response = await fetch(
      `http://localhost:3000/get-by-cost/${max}/${min}`,
      {
        method: "GET",
      }
    );
    const TypeData = await response.json();
    setTypeData(TypeData);
    setIsDataFiltered(true);
  };

  const toggleShow = (id) => {
    const elemento = document.getElementById(id);

    if (elemento.classList.contains("hidden") && !recentElement) {
      elemento.classList.remove("hidden");
      setRecentElement(id);
    } else if (elemento.classList.contains("hidden")) {
      document.getElementById(recentElement).classList.add("hidden");
      elemento.classList.remove("hidden");
      setRecentElement(id);
    } else if (!elemento.classList.contains("hidden")) {
      elemento.classList.add("hidden");
    }
  };

  var bikeBrands = [...new Set(Data.map((bike) => bike.Brand))];
  var bikeTypes = [...new Set(Data.map((bike) => bike.Type))];
  var bikeModels = [...new Set(Data.map((bike) => bike.Model))];
  var costsObject = [
    {
      text: "Less Than $10.000",
      min: 0.0,
      max: 9999.99,
      url: "low-cost",
    },
    {
      text: "$10.000 - $29.999",
      min: 10000.0,
      max: 29999.99,
      url: "mid-low-cost",
    },
    {
      text: "$30.000 - $49.999",
      min: 30000.0,
      max: 49999.99,
      url: "mid-high-cost",
    },
    {
      text: "Over $50.000",
      min: 50000.0,
      max: 99999999.99,
      url: "high-cost",
    },
  ];

  return (
    <div className="px-10">
      <div className="w-full">
        <h1 className="w-fit m-auto text-3xl font-semibold text-center mt-12 mb-8 text-white">
          Your Next Bike
        </h1>
        <div className="z-20 2xl:w-[1480px] xl:w-[1210px] lg:w-[950px] md:w-[700px]">
          <nav className="h-fit text-white mb-6 w-full py-3 bg-[rgb(5,5,15)] rounded-3xl flex justify-center px-4 md:px-0">
            <button
              onClick={() => {setIsDataFiltered(false); setBikePage(false); recentElement ? document.getElementById(recentElement).classList.add("hidden"): null}}
              id="homeElement"
              className="flex px-4 py-1 font-semibold rounded-xl align-middle my-auto hover:bg-slate-100 hover:text-slate-950 lg:w-[120px] sm:w-[100px] w-40 start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-house-door-fill align-middle my-auto ml-2 mr-1 w-4 h-4 "
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
              Home
            </button>
            <h3 className="w-40 xl:w-[120] lg:w-[80px] sm:w-[60px] mx-7 my-1 align-middle ">Filter by:</h3>
            <div className="flex space-x-2 lg:space-x-8">
              <div className="h-6 container px-4 w-fit items-center block">
                <button
                  className="flex px-3 py-1 font-semibold rounded-xl align-middle hover:bg-slate-100 hover:text-slate-950 lg:w-[120px] w-20"
                  onClick={() => toggleShow("brands")}
                >
                  Brand
                </button>
                <ul
                  id="brands"
                  className="hidden relative bg-[rgb(5,5,15)] border-white border-[1px] p-[3px] rounded-2xl w-fit ml-2"
                >
                  {bikeBrands.map((brand, index) => (
                    <li
                      className="z-[999] hover:bg-[rgb(240,240,240)] hover:text-[rgb(10,10,10)] font-medium hover:cursor-pointer p-1 rounded-xl"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          filterByType("Brand", brand);
                          bikePage ? setBikePage(false) : null
                        }}
                        className="w-full"
                      >
                        {brand}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-6 container px-4 w-fit items-center block">
                <button
                  className="flex px-3 py-1 font-semibold rounded-xl align-middle hover:bg-slate-100 hover:text-slate-950 lg:w-[120px] w-20"
                  onClick={() => toggleShow("costs")}
                >
                  Cost
                </button>
                <ul
                  id="costs"
                  className="hidden relative bg-[rgb(5,5,15)] border-white border-[1px] p-[3px] rounded-2xl w-fit ml-2"
                >
                  {costsObject.map((element, index) => (
                    <li
                      className="z-[999] hover:bg-[rgb(240,240,240)] hover:text-[rgb(10,10,10)] font-medium hover:cursor-pointer p-1 rounded-xl"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          filterByCost(element.max, element.min);
                          bikePage ? setBikePage(false) : null
                        }}
                      >
                        {element.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-6 container px-4 w-fit items-center block">
                <button
                  className="flex px-3 py-1 font-semibold rounded-xl align-middle hover:bg-slate-100 hover:text-slate-950 lg:w-[120px] w-20"
                  onClick={() => toggleShow("types")}
                >
                  Type
                </button>
                <ul
                  id="types"
                  className="hidden relative bg-[rgb(5,5,15)] border-white border-[1px] p-[3px] rounded-2xl w-fit ml-2"
                >
                  {bikeTypes.map((type, index) => (
                    <li
                      className="z-[999] hover:bg-[rgb(240,240,240)] hover:text-[rgb(10,10,10)] font-medium hover:cursor-pointer p-1 rounded-xl"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          filterByType("Type", type);
                          bikePage ? setBikePage(false) : null
                        }}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-6 container px-4 w-fit items-center block">
                <button
                  className="flex px-3 py-1 font-semibold rounded-xl align-middle  hover:bg-slate-100 hover:text-slate-950 lg:w-[120px] w-20"
                  onClick={() => toggleShow("models")}
                >
                  Model
                </button>
                <ul
                  id="models"
                  className="hidden relative bg-[rgb(5,5,15)] border-white border-[1px] p-[3px] rounded-2xl w-fit ml-2"
                >
                  {bikeModels.map((model, index) => (
                    <li
                      className="z-[999] hover:bg-[rgb(240,240,240)] hover:text-[rgb(10,10,10)] font-medium hover:cursor-pointer p-1 rounded-xl"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          filterByType("Model", model);
                          bikePage ? setBikePage(false) : null
                        }}
                        className="w-full"
                      >
                        {model}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {bikePage ? (
          <PageComponent bikeData={bikeData}/>
        ) : (
          <BikeComponent setBikePage={bikePageFunc} BikeData={isDataFiltered ? typeData : Data} />
        )}
      </div>
    </div>
  );
}

export default MainPage;
