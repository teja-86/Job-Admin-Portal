import Image from "next/image";
import React, { useEffect, useState } from "react";
import locationData from "../data/locations.json";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useGlobalContext } from "@/context/GlobaProvider";
const Filters = () => {
  const { filters, setFilters } = useGlobalContext();
  const [active, setActive] = useState(true);
  const [jobType, setJobType] = useState("Job Type");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState([0, 50]);
//   console.log(filters);

  const types = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const locations = locationData.locations;
  let filteredSuggestions = locations
    .filter((item) =>
      item.toLowerCase().includes(filters.location.toLowerCase())
    )
    .slice(0, 5);

  useEffect(() => {
    setFilters({
      ...filters,
      min_salary: Math.round(value[0]) + 50,
      max_salary: Math.round(value[1]) + 50,
    });
  }, [value]);
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 divide-x-2 pt-1 pb-4">
        <div className="p-2 flex gap-5 items-center justify-center">
          <Image
            src="/search.svg"
            width="24"
            height="24"
            alt="location"
            className="w-4"
          />
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => {
              setFilters({
                ...filters,
                search: e.target.value,
              });
            }}
            placeholder="Search By Job Title, Role"
            className="placeholder-gray-500 focus:outline-none w-[200px]"
          />
        </div>
        <div className="flex justify-center">
          <div className="">
            <div className="p-2 flex gap-5 items-center justify-center">
              <Image
                src="/location.svg"
                width="24"
                height="24"
                alt="location"
                className="w-4 "
              />
              <input
                type="text"
                name="location"
                id="location"
                value={filters.location}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    location: e.target.value,
                  });
                  setActive(true);
                }}
                placeholder="Preferred Location"
                className="placeholder-gray-500 focus:outline-none max-w-[200px]"
              />
              <Image
                src="/downArrow.svg"
                width="24"
                height="24"
                alt="location"
                className="w-3"
              />
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 bg-white w-full">
                {filters.location &&
                  active &&
                  filteredSuggestions.length > 0 && (
                    <div className=" no-scrollbar border rounded-xl">
                      {filteredSuggestions.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-2 cursor-pointer hover:bg-[#BCBCBC] rounded-lg"
                          onClick={() => {
                            setFilters({
                              ...filters,
                              location: item,
                            });
                            setActive(false);
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="p-2 flex gap-5 cursor-default items-center justify-center relative">
            <div className="">
              <div
                onClick={() => setIsOpen(true)}
                className={
                  jobType === "Job Type"
                    ? "flex justify-between w-[250px] items-center text-gray-500"
                    : "flex justify-between w-[250px] items-center text-black"
                }
              >
                <div className="flex items-center gap-3 ">
                  <Image
                    src="/person.svg"
                    width="24"
                    height="24"
                    alt="person"
                    className="w-4"
                  />
                  {filters.job_type ? (
                    <h1 className="w-full text-black">{filters.job_type}</h1>
                  ) : (
                    <h1 className="w-full">Job Type</h1>
                  )}
                </div>
                <Image
                  src="/downArrow.svg"
                  width="24"
                  height="24"
                  alt="location"
                  className="w-3"
                />
              </div>
              <div className={isOpen ? `relative w-full z-[100]` : `hidden`}>
                <div
                  onMouseLeave={() => setIsOpen(false)}
                  className="absolute top-0 border w-full z-10 bg-white rounded-md p-1"
                >
                  {types.map((type, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          job_type: type,
                        });
                        setIsOpen(false);
                      }}
                      className="px-2 py-1 rounded-md hover:bg-gray-200 duration-200"
                    >
                      {type}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="">
            <div className="flex justify-between w-[250px]">
              <h1>Salary Per Month</h1>
              <h1>
                {filters.min_salary}k - {filters.max_salary}k
              </h1>
            </div>
            <div className="pt-2">
              <RangeSlider
                value={value}
                onInput={setValue}
                id="range-slider-gradient"
                className="margin-lg"
                step={"any"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
