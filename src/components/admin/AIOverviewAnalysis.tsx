import React from "react";

import { BrainIcon } from "lucide-react";
export function AIAnalysis() {
  return (
    <div className="px-6 py-4">
      <div className="mb-6 rounded-xl border-gray-100 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-lg font-semibold text-gray-800">
            <BrainIcon size={20} className="mr-2 text-purple-500" />
            AI Analysis & Insights
          </h2>
        </div>

        <div>
          <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
            <h1 className="font-bold mb-2">Client Achivements Summary</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nostrum, nesciunt dignissimos in fuga dicta quia autem possimus perferendis, maiores ab quidem et temporibus sequi suscipit nulla? Iure, assumenda cumque!</p>
          </div>

          <div className="mt-4 flex gap-4">
            <div className="w-1/2">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <h1 className="font-bold mb-2">Website Interaction Summary</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam tempora accusantium est quos omnis officia sit tenetur fugit suscipit blanditiis ullam, voluptas dignissimos magni voluptates inventore eius, eaque expedita quisquam.</p>
              </div>
              </div>

              <div className="w-1/2">
                <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                  <h1 className="font-bold mb-2">Website Interaction Summary</h1>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis vitae eius in minima totam quae, placeat incidunt obcaecati facere. Ad, voluptatem tenetur. Animi neque quos eos consequuntur cupiditate! Velit, tempora?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
