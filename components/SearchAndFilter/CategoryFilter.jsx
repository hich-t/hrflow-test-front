import React, { useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'; 
import { useAppContext } from '../../context/AppContext';

const CategoryFilter = ({ onChange }) => {
  const { categories, isDarkMode } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState('');
  const textColor = isDarkMode ? 'text-white' : 'text-darkblue';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialCategory = localStorage.getItem('selectedCategory') || '';
      setSelectedCategory(initialCategory);
    }
  }, [categories]);

  const filteredCategories = query === ''
    ? categories
    : categories.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );

  const clearSelection = () => {
    setSelectedCategory('');
    setQuery('');
    onChange('');
    localStorage.removeItem('selectedCategory');
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    onChange(selected);
  };



  return (
    <div className={`w-full ${textColor}`}>
      <Combobox value={selectedCategory} onChange={handleCategoryChange}>
        <div className="relative">
          <Combobox.Input
            className=" text-black w-full border font-quick border-lightblue rounded-md shadow-sm pl-3 pr-10 py-2 focus:outline-none focus:ring-lightblue focus:border-lightblue sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(category) => category}
            placeholder="Select a category"

          />
          {selectedCategory && (
            <button
              onClick={clearSelection}
              className="absolute inset-y-0 right-8 flex items-center pr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-black  border-black border rounded-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6.75 6.75 10.5 10.5m0-10.5-10.5 10.5"
                />
              </svg>
            </button>
          )}
          <Combobox.Button className="absolute inset-y-0 right-0 flex font-quick items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 font-quick w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCategories.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCategories.map((category, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-lightblue text-white' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {category}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );  
};

export default CategoryFilter;