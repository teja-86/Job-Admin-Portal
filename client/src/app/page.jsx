"use client";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobaProvider";
import { axiosInstance } from "@/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { filters, jobs, setJobs } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search: filters.search,
          location: filters.location,
          min_salary: filters.min_salary * 1000,
          max_salary: filters.max_salary * 1000,
          job_type: filters.job_type,
        }).toString();
        const res = await axiosInstance.get(`/api/jobs?${query}`);
        console.log(res);
        setJobs(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters]);
  return (
    <div className="bg-[#FBFBFF] lg:px-10 py-10 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {jobs &&
            jobs.map((job) => {
              return (
                <div key={job._id} className="">
                  <JobCard job={job} />
                </div>
              );
            })}
        </div>
        </div>
      )}
    </div>
  );
}
