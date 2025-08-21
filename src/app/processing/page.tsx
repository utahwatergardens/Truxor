"use client";

import ProcessingIndicator from "@/components/ProcessingIndicator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProcessingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Creating Your 3D Model
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your equipment video has been processed and sent to Polycam for 3D reconstruction. 
            Track the progress below and we'll notify you when it's ready!
          </p>
        </div>

        {/* Processing Indicator */}
        <ProcessingIndicator />

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <p className="font-medium">Email Notification</p>
                <p className="text-gray-600">You'll receive an email when processing is complete</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <p className="font-medium">Download GLB</p>
                <p className="text-gray-600">Download your 3D model file from Polycam</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <p className="font-medium">Website Integration</p>
                <p className="text-gray-600">We'll help integrate it into your website</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
