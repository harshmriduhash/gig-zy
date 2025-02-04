import React from "react";
import { CheckCircle, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Dedicated hiring experts",
    description:
      "Count on an account manager to find you the right talent and see to your project's every need.",
  },
  {
    title: "Satisfaction guarantee",
    description:
      "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    title: "Advanced management tools",
    description:
      "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    title: "Flexible payment models",
    description:
      "Pay per project or opt for hourly rates to facilitate longer-term collaboration.",
  },
];

export function GigzyPro() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 lg:p-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            The{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              premium
            </span>{" "}
            freelance solution for businesses
          </h2>

          <div className="grid gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
            Try Gigzy Pro
          </button>
        </div>

        <div className="relative">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Project Status
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                92% | 4 steps out of 5
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Team collaboration"
              className="w-full rounded-lg"
            />
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  $8,900
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full w-[92%] bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
