"use client";

import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background.jsx";

export default function PlaceholdersAndVanishInputDemo() {
  // console.log(user?.id);
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [Skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [scenario, setScenario] = useState("");
  const [purpose, setPuropse] = useState("");
  const router = useRouter();
  //   const handleChange = (e) => {
  //     console.log(e.target.value);
  //   };

  const [toimprove, setSelectedValues] = useState([]);

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add value to selected values
      setSelectedValues((prev) => [...prev, value]);
    } else {
      // Remove value from selected values
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    }
  };

  const submitALL = async () => {
    const response = await fetch("http://192.168.31.184:5000/user_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        Skills,
        experience,
        scenario,
        purpose,
        toimprove,
      }),
    });

    const result = await response.json();
    // alert(`Response from Flask: ${result.message}`);
    console.log(result.message);
    if (result.message == "success") {
      router.push("/connector");
    }

    // console.log(
    //   role,
    //   field,
    //   experience,
    //   scenario,
    //   purpose,
    //   selectedValues.join(", ")
    // );
  };

  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute  flex flex-col gap-4 items-center justify-center px-8 h-full w-full"
        >
          <div className="absolute z-50 top-0 h-full w-full -mt-24 flex flex-col justify-center  items-center px-4">
            {step == 0 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Tell me your Role/Position
                </h2>
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Software Developer",
                    "Manager",
                    "Data Scientist",
                    "Product Manager",
                    "Sales Representative",
                    "Customer Service Representative",
                    "Marketing Specialist",
                    "Human Resources Professional",
                    "Accountant",
                    "Engineer",
                  ]}
                  onChange={(e) => setRole(e.target.value)}
                  onSubmit={() => (setStep(1), console.log(role))}
                />
              </>
            )}
            {step == 1 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Key Skills
                </h2>
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Python",
                    "Teaching",
                    "Next JS",
                    "Writing",
                    "Animation",
                  ]}
                  onChange={(e) => setSkills(e.target.value)}
                  onSubmit={() => (setStep(2), console.log(Skills))}
                />
              </>
            )}

            {step == 2 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Experience Level
                </h2>
                <div className="flex gap-3 flex-wrap justify-center text-lg">
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-52 h-auto text-2xl"
                    onClick={() => (setExperience("0-1"), setStep(3))}
                  >
                    0-1 Years
                  </button>
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-52 h-auto text-2xl"
                    onClick={() => (setExperience("1-2"), setStep(3))}
                  >
                    1-2 Years
                  </button>
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-52 h-auto text-2xl"
                    onClick={() => (setExperience("2-5"), setStep(3))}
                  >
                    2-5 Years
                  </button>
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-52 h-auto text-2xl"
                    onClick={() => (setExperience("5-10"), setStep(3))}
                  >
                    5-10 Years
                  </button>
                </div>
              </>
            )}

            {step == 3 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Scenario Type
                </h2>
                <div className="flex gap-3 flex-wrap justify-center text-lg">
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-72 h-auto text-2xl"
                    onClick={() => (setScenario("interview"), setStep(4))}
                  >
                    Interview
                  </button>
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-72 h-auto text-2xl"
                    onClick={() => (
                      setScenario("Business-meeting"), setStep(4)
                    )}
                  >
                    Business Meeting
                  </button>
                  <button
                    className="text-center my-2 inline-block w-48 rounded-full bg-slate-200 bg-opacity-25 px-4 py-2 font-semibold text-white duration-200 hover:bg-opacity-95 hover:text-black hover:no-underline sm:w-72 h-auto text-2xl"
                    onClick={() => (
                      setScenario("personal-communication"), setStep(4)
                    )}
                  >
                    Personal Communication
                  </button>
                </div>
              </>
            )}
            {step == 4 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Purpose of Meeting
                </h2>
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Job Interview",
                    "Promotion Interview",
                    "Negotiation",
                    "Presentation",
                    "Public Speaking",
                    "Team Meeting",
                    "Client Meeting",
                    "Networking Event",
                    "Conference",
                    "Workshop",
                  ]}
                  onChange={(e) => setPuropse(e.target.value)}
                  onSubmit={() => setStep(5)}
                />
              </>
            )}
            {step == 5 && (
              <>
                <h2 className="mb-10 font-bold font-quicksand	lg:mb-20 text-2xl text-center sm:text-7xl  text-white">
                  Key Skills to Focus On
                </h2>
                <div className="w-1/2">
                  <ul className="text-sm font-medium text-gray-900 bg-white  bg-opacity-95 rounded-lg dark:bg-gray-900  dark:text-white">
                    <li className="w-full rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value="technical"
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
                        >
                          Technical
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value="behavioral"
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
                        >
                          Behavioral
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value="communication"
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
                        >
                          Communication
                        </label>
                      </div>
                    </li>
                  </ul>
                  <button
                    type="Button"
                    className="flex m-auto mt-24 justify-center items-center"
                    onClick={() => (setStep(6), submitALL())}
                  >
                    <div className="bg-black ">
                      <div className="relative inline-flex  group">
                        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <a
                          title="Get quote now"
                          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          role="button"
                        >
                          Proceed
                        </a>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* {selectedValues} */}
          </div>
        </motion.div>
      </AuroraBackground>
    </>
  );
}
