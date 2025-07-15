import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function PersonaCard({ persona }) {
  const [isDark, setIsDark] = useState(false);

  const {
    basic_info,
    traits,
    motivations,
    personality,
    habits,
    goals,
    frustrations,
    quote,
  } = persona;

  const raw = traits[0]; // extract the single big string

  const traitsArray = raw
    .split("\n") // split by newline
    .map((t) => t.replace(/^-/, "").trim()) // remove leading dash + trim
    .filter(Boolean); // remove empty strings

  const themeClasses = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";

  return (
    <div
      className={`h-screen ${themeClasses} transition-colors duration-300 overflow-hidden relative`}
    >
      {/* Main Content Container */}
      <div className="h-full flex justify-evenly">
        {/* Left Column - Image and Quote */}
        <div className="w-1/4 h-[85vh] relative">
          <img
            src="/beyondchat.jpg"
            alt={basic_info.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-transparent p-6">
            <p className="text-white text-md font-medium italic">"{quote}"</p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-2/3 py-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl pb-2 border-b-3 border-gray-700 font-bold text-gray-800 dark:text-gray-100 mb-1 inline-block">
              {basic_info.name}
            </h1>
            <p className="text-md text-gray-500 dark:text-gray-400">
              {basic_info.occupation} • {basic_info.location}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-7">
            {/* Column 1 - Basic Info, Motivations, Personality */}
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-5 mb-6">
                <div className="grid grid-cols-2 gap-2 text-md border-b-3 pb-2 border-gray-700">
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400 block">
                      AGE
                    </span>
                    <span className="dark:text-gray-300">{basic_info.age}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400 block">
                      STATUS
                    </span>
                    <span className="dark:text-gray-300">
                      {basic_info.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400 block">
                      TIER
                    </span>
                    <span className="dark:text-gray-300">
                      {basic_info.tier}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400 block">
                      ARCHETYPE
                    </span>
                    <span className="dark:text-gray-300">
                      {basic_info.archetype}
                    </span>
                  </div>
                </div>

                {/* Traits */}
                {/* Traits Grid */}
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {traitsArray.map((trait, i) => (
                    <div
                      key={i}
                      className="text-md font-medium bg-gray-200 text-gray-700 rounded px-4 py-2 text-center"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivations */}
              <div>
                <h3 className="text-lg border-b-3 pb-2 border-gray-700 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Motivations
                </h3>
                <div className="space-y-2">
                  {Object.entries(motivations).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <div className="flex justify-between mb-0.5">
                        <span className="font-medium dark:text-gray-300">
                          {key}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {value}/5
                        </span>
                      </div>
                      <div
                        className={`w-full h-1.5 rounded-full ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personality */}
              <div>
                <h3 className="text-lg border-b-3 pb-2 border-gray-700 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Personality
                </h3>
                <div className="space-y-2">
                  {Object.entries(personality).map(([key]) => {
                    const pairs = {
                      INTROVERT: "EXTROVERT",
                      INTUITION: "SENSING",
                      FEELING: "THINKING",
                      PERCEIVING: "JUDGING",
                    };

                    const isPrimary = Object.keys(pairs).includes(key);
                    if (!isPrimary) return null;

                    const opposite = pairs[key];
                    const oppositeValue = personality[opposite];

                    return (
                      <div key={key} className="text-xs">
                        <div className="flex justify-between mb-0.5">
                          <span className="font-medium dark:text-gray-300">
                            {key}
                          </span>
                          <span className="font-medium dark:text-gray-300">
                            {opposite}
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          } relative`}
                        >
                          <div
                            className="absolute h-full bg-violet-500 rounded-full"
                            style={{
                              width: `${(oppositeValue / 5) * 100}%`,
                              right: 0,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2 - Behavior & Habits, Goals & Needs */}
            <div className="space-y-7">
              {/* Behavior & Habits */}
              <div>
                <h3 className="text-lg border-b-3 pb-2 border-gray-700 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Behaviour & Habits
                </h3>
                <ul className="space-y-1.5">
                  {habits.map((habit, i) => (
                    <li key={i} className="text-md leading-relaxed flex">
                      <span className="text-amber-500 mr-1.5">•</span>
                      <span className="dark:text-gray-300">{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goals & Needs */}
              <div>
                <h3 className="text-lg border-b-3 pb-2 border-gray-700 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Goals & Needs
                </h3>
                <ul className="space-y-1.5">
                  {goals.map((goal, i) => (
                    <li key={i} className="text-md leading-relaxed flex">
                      <span className="text-amber-500 mr-1.5">•</span>
                      <span className="dark:text-gray-300">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3 - Frustrations */}
            <div>
              <h3 className="text-lg border-b-3 pb-2 border-gray-700 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Frustrations
              </h3>
              <ul className="space-y-1.5">
                {frustrations.map((frustration, i) => (
                  <li key={i} className="text-md leading-relaxed flex">
                    <span className="text-amber-500 mr-1.5">•</span>
                    <span className="dark:text-gray-300">{frustration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
