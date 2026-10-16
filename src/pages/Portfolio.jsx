import React from "react";
import Logo from "../assets/logo.png"
function Portfolio() {
  return (
    
    <div className="px-6 sm:px-12 md-px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-base-100 shadow-sm rounded-lg overflow-hidden p-6 gap-6">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="https://hr2.fareastcafeshop.com/" target="_blank" rel="noopener noreferrer">
                <img class="rounded-t-lg W-10" src={Logo} alt="Art Javar Pregoner" />
            </a>
            <div class="p-5">
                <a href="https://hr2.fareastcafeshop.com" target="_blank" rel="noopener noreferrer">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Human Resources System</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">This system has only Workforce Analytics, Claims&Reimbursement, Helpdesk, and Employee Self-Service submodule. I use laravel (with livewire), MySQL, bootstrap and AI to build this website.</p>
                <a href="https://hr2.fareastcafeshop.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Visit
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>

      </div>
    </div>

  );
}

export default Portfolio;
