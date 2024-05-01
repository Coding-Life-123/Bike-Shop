import React, { useState } from "react";

function PageComponent({ bikeData }) {
  var data = bikeData[0];

  var engineDataJSON = [
    {
      name: "Engine Type",
      value: `${data.EngineQuickDesc}`,
    },
    {
      name: "Compression Ratio",
      value: `${data.CompressionRatio.slice(0, -2)} : 1`,
    },
    {
      name: "Power",
      value: `${data.PowerHP}hp (${
        (data.PowerHP / 1.341).toString().split(".")[0]
      }kw) at ${data.EngineMaxHpRPM} rpm`,
    },
    {
      name: "Torque",
      value: `${data.Torque}nm of torque at ${data.EngineMaxNmRPM} rpm`,
    },
    {
      name: "Fuel Delivery",
      value: `${data.FuelDelivery}`,
    },
  ];

  var transmissionDataJSON = [
    {
      name: "Transmission",
      value: `${data.Transmission}`,
    },
    {
      name: "Clutch",
      value: `${data.Clutch}`,
    },
  ];

  var chassisDataJSON = [
    {
      name: "Wet Weight",
      value: `${data.WetWeight}kg`,
    },
    {
      name: "Dry Weight",
      value: `${data.DryWeight}kg`,
    },
    {
      name: "Fuel Capacity",
      value: `${data.FuelCapacity.slice(0, -2)} gal`,
    },
    {
      name: "Front Brakes",
      value: `${data.BrakesFront}`,
    },
    {
      name: "Rear Brakes",
      value: `${data.BrakesRear}`,
    },
    {
      name: "Front Suspension",
      value: `${data.SuspensionFront}`,
    },
    {
      name: "Rear Suspension",
      value: `${data.SuspensionRear}`,
    },
    {
      name: "Tires Front/Rear",
      value: `${data.TiresFront} / ${data.TiresRear}`,
    },
  ];

  var dimensionsDataJSON = [
    {
      name: "Bike Lenght",
      value: `${!data.BikeLong ? null : data.BikeLong.slice(0, -2)}in`,
    },
    {
      name: "Bike Width",
      value: `${!data.BikeWidth ? null : data.BikeWidth.slice(0, -2)}in`,
    },
    {
      name: "Bike Height",
      value: `${!data.BikeHeight ? null : data.BikeHeight.slice(0, -2)}in`,
    },
    {
      name: "Seat Height",
      value: `${!data.SeatHeight ? null : data.SeatHeight.slice(0, -2)}in`,
    },
    {
      name: "Wheelbase",
      value: `${!data.Wheelbase ? null : data.Wheelbase.slice(0, -2)}in`,
    },
  ];

  return (
    <div className="mx-auto text-white px-4 my-4">
      <div className="2xl:text-2xl xl:text-xl lg:text-lg md:text-sm block w-fit mx-auto">
        <div className="w-1/3 2xl:h-[720px] 2xl:w-[250px] xl:h-[585px] xl:w-[200px] lg:h-[455px] lg:w-[160px] md:h-[370px] md:w-[130px] opacity-85 absolute bg-black">
          <div className="2xl:mt-[180px] xl:mt-[140px] lg:mt-[100px] md:mt-[40px] align-middle h-fit px-3 w-full font-semibold">
            <div className="mx-auto">{data.Name}</div>
            <p className="my-12 mx-auto">Price: ${data.Cost}</p>
            <div className="block xl:text-sm md:text-[10px] text-center">
              <a href="#bikeDesc" className="hover:font-bold font-medium">DESCRIPTION</a>
              <p className="hidden lg:inline lg:mx-2">|</p>
              <hr className="lg:hidden my-1 xl:my-2" />
              <a href="#engine" className="hover:font-bold font-medium">ENGINE</a>
              <hr className="my-1 xl:my-2" />
              <a href="#transmission" className="hover:font-bold font-medium">TRANSMISSION</a>
              <p className="hidden lg:inline lg:mx-2">|</p>
              <hr className="lg:hidden my-1 xl:my-2" />
              <a href="#chassis" className="hover:font-bold font-medium">CHASSIS</a>
              <hr className="my-1 xl:my-2" />
              <a href="#dimensions" className="hover:font-bold font-medium">DIMENSIONS</a>
            </div>
          </div>
        </div>
        <img
          src={data.BikePageImage}
          className="2xl:w-[1440px] 2xl:h-[720px] xl:w-[1170px] xl:h-[585px] lg:w-[910px] lg:h-[455px] md:w-[660px] md:h-[370px] overflow-hidden -z-10"
          alt=""
        />
      </div>
      <div className="w-full mr-10">
        <section id="bikeDesc" className="w-[500px] mx-auto">
          <p className="lg:text-xl mt-8 p-8 rounded-2xl bg-[rgb(45,45,45)] shadow-[0px_0px_10px] shadow-black">
            {data.BikeDesc}
          </p>
        </section>
        <h2 className="xl:text-3xl lg:text-2xl md:text-xl w-fit mx-auto mt-14 mb-4">
          SPECS
        </h2>
        <section id="engine" className="text-left mb-10 w-1/2">
          <h2 className="xl:text-xl lg:text-lg md:text-base mb-2">ENGINE</h2>

          <table className=" *:p-[5px] bg-[rgb(40,40,40)] *:space-x-12 table ">
            <tbody className="text-left">
              {engineDataJSON.map((element, index) =>
                element.value.includes("null") ? null : (
                  <tr
                    className="*:px-3 *:py-3 border-b last:border-b-0"
                    key={index}
                  >
                    <th className="w-1/2" scope="row">
                      {element.name}
                    </th>
                    <td className="text-right">{element.value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
        <section id="transmission" className="ml-auto mr-0 w-1/2">
          <h2 className="xl:text-xl lg:text-lg md:text-base mb-2">
            TRANSMISSION
          </h2>

          <table className=" *:p-[5px] bg-[rgb(40,40,40)] *:space-x-12 table w-full">
            <tbody className="text-left">
              {transmissionDataJSON.map((element, index) =>
                element.value.includes("null") ? null : (
                  <tr
                    className="*:px-3 *:py-3 border-b last:border-b-0"
                    key={index}
                  >
                    <th className="w-1/2" scope="row">
                      {element.name}
                    </th>
                    <td className="text-right">{element.value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
        <section id="chassis" className="text-left mb-10">
          <h2 className="xl:text-xl lg:text-lg md:text-base mb-2">CHASSIS</h2>

          <table className=" *:p-[5px] bg-[rgb(40,40,40)] *:space-x-12 table ml-0 mr-auto w-1/2">
            <tbody className="text-left">
              {chassisDataJSON.map((element, index) =>
                element.value.includes("null") ? null : (
                  <tr
                    className="*:px-3 *:py-3 border-b last:border-b-0"
                    key={index}
                  >
                    <th className="w-1/2" scope="row">
                      {element.name}
                    </th>
                    <td className="text-right">{element.value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
        <section id="dimensions" className="ml-auto mr-0 w-1/2">
          <h2 className="xl:text-xl lg:text-lg md:text-base mb-2">
            DIMENSIONS
          </h2>

          <table className=" *:p-[5px] bg-[rgb(40,40,40)] *:space-x-12 table ml-auto mr-0 w-full">
            <tbody className="text-left">
              {dimensionsDataJSON.map((element, index) =>
                element.value.includes("null") ? null : (
                  <tr
                    className="*:px-3 *:py-3 border-b last:border-b-0"
                    key={index}
                  >
                    <th className="w-1/2" scope="row">
                      {element.name}
                    </th>
                    <td className="text-right">{element.value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default PageComponent;
