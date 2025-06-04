"use client";
import { Select } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Filters from "./Filters";
import locationData from "../data/locations.json";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
const Navbar = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [active, setActive] = useState(true);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    min_salary: "",
    max_salary: "",
    job_type: "",
    deadline: "",
    description: "",
  });
  // console.log(jobData);
  const locations = locationData.locations;

  let filteredSuggestions = locations
    .filter((item) =>
      item.toLowerCase().includes(jobData.location.toLowerCase())
    )
    .slice(0, 5);
  const handleTriggerModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const formatNumber = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const types = ["Full-Time", "Part-Time", "Contract", "Internship"];

  const handleCreateJob = async (req, res) => {
    try {
      if (
        !jobData.title ||
        !jobData.company ||
        !jobData.location ||
        !jobData.job_type ||
        !jobData.min_salary ||
        !jobData.max_salary ||
        !jobData.deadline ||
        !jobData.description
      ) {
        throw new Error("All Fields are required");
      }
      const res = await toast.promise(
        axiosInstance.post("/api/jobs/", jobData),
        {
          pending: "Creating Job...",
          success: "Job Created",
          error: "Error",
        }
      );
      console.log(res);
      location.reload();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="fixed top-0 left-0 bg-white w-full shadow-md z-[100]">
        <div className="flex justify-center p-3 py-4">
          <div className="flex gap-5 items-center px-5 py-3 rounded-full font-[600] nav text-[#303030]">
            <Image
              src="/logo.png"
              width="100"
              height="100"
              alt="logo"
              className="w-[44px]"
            />
            <div className="lg:flex hidden gap-5">
            <Link
              href={"/"}
              className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Find Jobs
            </Link>
            <Link
              href={"/"}
              className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Find Talents
            </Link>
            <Link
              href={"/"}
              className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
            >
              About us
            </Link>
            <Link
              href={"/"}
              className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Testimonials
            </Link>
            </div>
            <div
              onClick={handleTriggerModal}
              className="bg-gradient-to-b cursor-default from-[#A128FF] to-[#6100AD] py-2 px-4 rounded-full text-white"
            >
              Create Jobs
            </div>
          </div>
        </div>
        <Filters />
      </div>
      <div className="lg:h-[160px] md:h-[200px] h-[270px] w-full"></div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-h-[90vh] lg:max-h-fit max-w-[650px]">
          <h3 className="font-bold text-lg text-center">Create Job Opening</h3>
          <form
            action=""
            className="grid md:grid-cols-2 gap-3 pt-5 text-[#636363] font-[600] "
          >
            <div className="grid gap-1 group ">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={jobData.title}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    title: e.target.value,
                  })
                }
                placeholder="Full Stack Developer"
                className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal placeholder:text-sm border rounded-[6px] py-1 px-3 focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid gap-1 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={jobData.company}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    company: e.target.value,
                  })
                }
                placeholder="Amazon , Microsoft , Swiggy"
                className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal placeholder:text-sm border rounded-[6px] py-1 px-3 focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid gap-1 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Location
              </label>
              <div className="relative">
                <div className="flex border rounded-[6px] items-center px-3">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={jobData.location}
                    onChange={(e) => {
                      setJobData({
                        ...jobData,
                        location: e.target.value,
                      });
                      setActive(true);
                    }}
                    placeholder="Choose preferred Location"
                    className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal placeholder:text-sm  py-1 focus:outline-none focus:border-black"
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
                    {jobData.location &&
                      active &&
                      filteredSuggestions.length > 0 && (
                        <div className=" no-scrollbar border rounded-xl">
                          {filteredSuggestions.map((item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between p-2 cursor-pointer hover:bg-[#BCBCBC] rounded-lg"
                              onClick={() => {
                                setJobData({
                                  ...jobData,
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
            <div className="grid gap-1 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Job Type
              </label>
              <div className="w-full">
                <div
                  onClick={() => setIsOpen2(true)}
                  className="flex justify-between w-full border py-1 rounded-[6px] px-3 items-center"
                >
                  <div className="flex items-center gap-3  ">
                    {jobData.job_type ? (
                      <h1>{jobData.job_type}</h1>
                    ) : (
                      <h1 className="text-[#BCBCBC] font-normal">FullTime</h1>
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
                <div
                  className={
                    isOpen2 ? `relative w-full z-[100] font-[500]` : `hidden`
                  }
                >
                  <div
                    onMouseLeave={() => setIsOpen2(false)}
                    className="absolute top-0 border w-full z-10 bg-white rounded-md"
                  >
                    {types.map((type, i) => (
                      <p
                        key={i}
                        onClick={() => {
                          setJobData({
                            ...jobData,
                            job_type: type,
                          });
                          setIsOpen2(false);
                        }}
                        className="px-2 py-1 hover:bg-gray-200 duration-200"
                      >
                        {type}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-1 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Salary Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex focus:border-black px-3 py-1 border rounded-[6px] gap-2 items-center">
                  <Image
                    src="/salary.svg"
                    width="24"
                    height="24"
                    alt="location"
                    className="w-3 text-[#686868]"
                  />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#BCBCBC] font-light"> &#8377;</span>
                    <input
                      type="text"
                      name="min_salary"
                      id="min_salary"
                      placeholder="0"
                      value={formatNumber(jobData.min_salary)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(rawValue)) {
                          setJobData({
                            ...jobData,
                            min_salary: rawValue,
                          });
                        }
                      }}
                      className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal text-sm  py-1 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex focus:border-black px-3 py-1 border rounded-[6px] gap-2 items-center">
                  <Image
                    src="/salary.svg"
                    width="24"
                    height="24"
                    alt="location"
                    className="w-3 text-[#686868]"
                  />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#BCBCBC] font-light"> &#8377;</span>
                    <input
                      type="text"
                      name="min_salary"
                      id="min_salary"
                      placeholder="1200000"
                      value={formatNumber(jobData.max_salary)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(rawValue)) {
                          setJobData({
                            ...jobData,
                            max_salary: rawValue,
                          });
                        }
                      }}
                      className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal text-sm  py-1 focus:outline-none "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-1 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                value={jobData.deadline}
                onChange={(e) => {
                  setJobData({
                    ...jobData,
                    deadline: e.target.value,
                  });
                }}
                placeholder="Amazon , Microsft , Swiggy"
                className="w-full placeholder-text-[#BCBCBC] placeholder:font-normal placeholder:text-sm border rounded-[6px] py-1 px-3 focus:outline-none focus:border-black"
              />
            </div>
            <div className="grid gap-1 md:col-span-2 group">
              <label htmlFor="" className="group-hover:text-[#222222] pl-0.5">
                Job Description
              </label>
              <textarea
                type="text"
                name="company"
                id="company"
                value={jobData.description}
                onChange={(e) => {
                  setJobData({
                    ...jobData,
                    description: e.target.value,
                  });
                }}
                placeholder="Please share a description to let the candidate know more about the job role"
                className="w-full min-h-[100px] placeholder-text-[#BCBCBC] placeholder:font-normal placeholder:text-sm border rounded-[6px] py-1 px-3 focus:outline-none focus:border-black"
              />
            </div>
          </form>
          <div className="flex justify-between pt-2 modal-action">
            <form method="dialog">
              <button className="flex border items-center px-5 py-1.5 rounded-[6px] border-black gap-2">
                <h1>Save Draft</h1>
                <MdKeyboardDoubleArrowDown />
              </button>
            </form>
            <div
              onClick={handleCreateJob}
              className="flex border cursor-pointer items-center px-5 py-1.5 bg-blu text-white rounded-[6px] gap-1"
            >
              <h1>Publish</h1>
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;
