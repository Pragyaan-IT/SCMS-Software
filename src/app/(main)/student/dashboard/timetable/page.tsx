export default function TimetablePage() {
    return (
        <div className="p-4">
            <h1>Timetable</h1>
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center p-4 mb-4 bg-gray-300 border-b-1 border-gray-200 relative">
                    <div className="flex items-center">
                        <div className="text-lg font-semibold mr-4">
                            <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full">26</span>
                            <span className="ml-2">August</span>, <span className="ml-2">2024</span>
                        </div>
                        <button id="toggle-calendar" className="ml-2 text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search months" className="search-input border border-gray-300 rounded-lg py-1 px-3" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-7 uppercase">
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Sun</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Mon</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Tue</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Wed</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Thu</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Fri</div>
                        <div className="p-4 text-center bg-gray-300 relative font-bold">Sat</div>
                    </div>
                    <div className="grid grid-cols-7">
                        <div className="p-4 text-center relative bg-gray-500 ">25</div>
                        <div className="p-4 text-center relative bg-white">26</div>
                        <div className="p-4 text-center relative bg-gray-500 ">27</div>
                        <div className="p-4 text-center relative bg-gray-500 ">28</div>
                        <div className="p-4 text-center relative bg-gray-500 ">29</div>
                        <div className="p-4 text-center relative bg-gray-500 ">30</div>
                        <div className="p-4 text-center relative bg-gray-500 ">31</div>
                    </div>
                </div>

                <div className="bg-gray-300 p-2 border-t-1 border-gray-300 rounded">
                    <p className="font-semibold">Holidays</p>
                    <ul>
                        <li>August 26 - Janmashtami</li>
                        <li>August 28 - Sports Day</li>
                    </ul>
                </div>

                <div className="bg-gray-300 p-2 border-t-1 border-gray-300 rounded mt-4">
                    <p className="font-semibold">Classes</p>
                    <div className="flex justify-between items-center p-2 border-b-1 border-gray-400 font-bold">
                        <span className="class-time">9 AM - 10 AM</span>
                        <span className="class-subject">Computer Networks</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border-b-1 border-gray-400 font-bold">
                        <span className="class-time">11 AM - 12 PM</span>
                        <span className="class-subject">Discrete Mathematics</span>
                    </div>
                    <p className="font-semibold mt-4">Quiz</p>
                    <div className="flex justify-between items-center p-2 border-b-1 border-gray-400 font-bold">
                        <span className="event-time">2 PM - 3 PM</span>
                        <span className="event-description">Quiz on Algebra</span>
                    </div>
                </div>
            </div>
        </div>
    );
}