import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 py-8 md:px-12 lg:px-16 xl:px-24">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 lg:mb-24">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight">
              Career Intelligence
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm hidden sm:inline">
              Already a member?
            </span>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              Sign in
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col max-w-xl">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="m4.93 4.93 14.14 14.14" />
                <path d="M2 12h20" />
                <path d="m4.93 19.07 14.14-14.14" />
              </svg>
              Your career, made clearer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-semibold text-gray-900 mb-6 tracking-tight">
              Turn your experience into your next opportunity.
            </h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Career Intelligence helps you understand your strengths, evaluate
              every role, and build a focused plan for what comes next.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                Create free account
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button className="w-full sm:w-auto px-6 py-3.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400 mb-16">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Private by design · Your data is never sold
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8 mt-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  See your fit before you apply
                </h3>
                <p className="text-gray-500 text-sm">
                  Match your skills to real role requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Know what to learn next
                </h3>
                <p className="text-gray-500 text-sm">
                  Turn skill gaps into focused learning goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Track momentum in one place
                </h3>
                <p className="text-gray-500 text-sm">
                  Keep opportunities, applications, and progress connected.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Column */}
      <div className="hidden lg:block w-1/2 relative bg-gray-100 overflow-hidden p-8">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="src/assets/Qwen_image_2.1_00019.png"
            alt="Professional at desk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Floating Cards Container */}
        <div className="relative h-full flex flex-col justify-between w-full max-w-lg mx-auto">
          {/* Top Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl mt-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Orbit Labs</p>
                <h3 className="font-bold text-gray-900 text-lg">
                  Senior Product Manager
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">
                86%
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                Product strategy
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                Analytics
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                SQL gap
              </span>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="bg-[#2A3441] rounded-2xl p-6 shadow-xl text-white mb-8">
            <p className="text-xl font-medium mb-4 leading-snug">
              "I stopped guessing which roles were right for me."
            </p>
            <p className="text-gray-400 text-sm">
              Hamid · Product leader in UAE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
