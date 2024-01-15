import React, { useState, useEffect } from "react";
import Spinner from "../components/status/Spinner";
import Empty from "../components/status/Empty";
import { useAppContext } from "../context/AppContext";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const JobsCards = () => {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [sortBy, setSortBy] = useState("name"); 
  const { filteredJobs, loading, isDarkMode, error, isEmpty } = useAppContext();

  const bgColor = isDarkMode ? "bg-darkblue" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-darkblue";
  const skillButtonBgColor = isDarkMode ? "bg-midblue" : "bg-darkblue";

  const handleCardClick = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const formatText = (text) => {
    return text.split(". ").map((sentence, index, array) => (
      <span key={index}>
        {sentence}
        {index < array.length - 1 ? ". " : ""}
        <br />
        <br />
      </span>
    ));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const sortOptions = [
    { value: "name", label: "Name (A to Z)" },
    { value: "dateRecent", label: "Date (Most Recent)" },
    { value: "dateOld", label: "Date (Least Recent)" },
  ];

  const sortedJobs = [...filteredJobs];

  const [jobCard, updateJobCard] = useState([]);

  if (sortBy === "name") {
    sortedJobs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "dateRecent") {
    sortedJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sortBy === "dateOld") {
    sortedJobs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  useEffect(() => {
    let sorted = [...filteredJobs];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "dateRecent") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "dateOld") {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    updateJobCard(sorted); 
  }, [filteredJobs, sortBy]); 

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(jobCard);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateJobCard(items); 
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isEmpty) {
    return <Empty />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col w-4/5 items-center justify-center gap-8 font-quick">
      <Menu as="div" className="relative inline-block text-center mb-4">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-lightblue focus:ring-lightblue active:bg-gray-100 active:text-black`}
              >
                Sort By:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
                <ChevronDownIcon className="h-5 w-5 text-black" />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={`origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-lightblue ring-opacity-5 focus:outline-none`}
              >
                <div className="py-1" role="none">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={`${
                            option.value === sortBy
                              ? "bg-lightblue text-white"
                              : "text-black"
                          } block w-full text-center px-4 py-2 text-sm`}
                        >
                          {option.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="jobcards">
          {(provided) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full sm:w-4/5 items-center justify-items-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobCard.map((job, index) => (
                <Draggable
                  key={job.id.toString()}
                  draggableId={job.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      onClick={() => handleCardClick(job.id)}
                      className={`p-4 ${bgColor} mx-4 mb-4 min-h-52	sm:min-h-60 cursor-pointer w-full flex flex-col justify-between rounded-xl transition-all duration-300 ${
                        isDarkMode
                          ? "shadow-light hover:shadow-hover-light"
                          : "shadow-dark hover:shadow-hover-dark"
                      } ${expandedJobId === job.id ? "w-full" : "w-3/4"}`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div
                        className={`${
                          expandedJobId === job.id ? "text-center" : ""
                        }`}
                      >
                        <h1 className={`${textColor} text-xl font-bold mb-2`}>
                          {job.name}
                        </h1>

                        {job.tags.find(
                          (tag) => tag.name === "company" && tag.value
                        ) && (
                          <div
                            className={`flex items-center mb-2 ${
                              expandedJobId === job.id ? "justify-center" : null
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-4 h-4 mr-2 ${textColor}`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378-.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                              />
                            </svg>
                            <p className={`${textColor}`}>
                              {
                                job.tags.find((tag) => tag.name === "company")
                                  ?.value
                              }
                            </p>
                          </div>
                        )}

                        <div
                          className={`flex items-center mb-2 ${
                            expandedJobId === job.id ? "justify-center" : null
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-4 h-4 mr-2 ${textColor}`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                          <p className={`${textColor}`}>{job.location?.text}</p>
                        </div>

                        <p className={`${textColor} mb-2 italic`}>
                          Posted on:{" "}
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {expandedJobId === job.id && (
                        <div
                          className={`${textColor} pt-4 max-w-prose mx-auto text-center text-justify text-sm`}
                        >
                          <div className="flex flex-wrap gap-2 mb-4 justify-center">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className={`rounded-lg ${skillButtonBgColor} text-white px-2 py-1 text-xs`}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                          <p className={`${textColor} mt-2 mb-2 italic`}>
                            {job.tags.find((tag) => tag.name === "type")?.value}
                          </p>
                          {job.summary && (
                            <>
                              <h3 className={`${textColor} font-bold mb-2`}>
                                About the Job:
                              </h3>
                              {formatText(job.summary)}
                            </>
                          )}
                          {job.tasks && job.tasks.length > 0 && (
                            <div className="mt-4 mb-8">
                              <h3 className={`${textColor} font-bold mb-2`}>
                                Tasks:
                              </h3>
                              <ul className={`${textColor}`}>
                                {job.tasks.map((task, index) => (
                                  <li key={index} className="mb-1">
                                    {task.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <p className="mt-4 mb-4 italic">
                            Updated on:{" "}
                            {new Date(job.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <div className="w-full pt-2 border-t border-gray-300">
                        {expandedJobId === job.id ? (
                          <p className={`${textColor} text-sm text-center`}>
                            Show less
                          </p>
                        ) : (
                          <p className={`${textColor} text-sm text-center`}>
                            Expand for details
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default JobsCards;
