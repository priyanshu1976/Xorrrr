"use client";
import React, { useState } from "react";
import { AlertCircle, Download, Map as MapIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf"; // Import jsPDF at the top

const RailwayDashboard = () => {
  const [sensorData, setSensorData] = useState([
    {
      id: 1,
      location: "Track Section A",
      kilometer: "23.5",
      defectType: "Rail Crack",
      severity: "High",
      timestamp: "2025-02-08 10:30:00",
    },
    {
      id: 2,
      location: "Track Section B",
      kilometer: "45.2",
      defectType: "Track Misalignment",
      severity: "Medium",
      timestamp: "2025-02-08 11:15:00",
    },
  ]);

  // Track visualization - simplified representation
  const TrackVisualization = () => (
    <div className="relative h-64 w-full bg-[#111827] rounded-lg p-4">
      <div className="absolute top-4 left-4">
        <MapIcon className="text-white" size={24} />
        <span className="ml-2 text-sm text-white">Track Map View</span>
      </div>

      <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#111827]">
        {sensorData.map((defect) => (
          <div
            key={defect.id}
            className="absolute h-4 w-4 bg-white rounded-full animate-pulse"
            style={{
              left: `${parseInt(defect.kilometer) * 2}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={`${defect.defectType} at ${defect.kilometer}km`}
          />
        ))}
      </div>
    </div>
  );

  const DefectAlerts = () => (
    <div className="space-y-4">
      {sensorData.map((defect) => (
        <Alert
          key={defect.id}
          variant="destructive"
          className={`bg-red-800/20 border-red-600 text-red-400 border p-4 rounded-md shadow-md`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-current" />
            <AlertTitle className="flex justify-between items-center w-full">
              <span>{defect.defectType}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadReport(defect)}
                className="flex items-center gap-2 border-neutral-600 text-black hover:bg-neutral-700 hover:text-white"
              >
                <Download className="h-4 w-4 text-black" />
                Download Report
              </Button>
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            Location: {defect.location} (KM: {defect.kilometer})<br />
            Severity: {defect.severity}
            <br />
            Detected: {defect.timestamp}
          </AlertDescription>
        </Alert>
      ))}
        
    </div>
  );

  // Handle PDF download
  const handleDownloadReport = (defect) => {
    const doc = new jsPDF();

    // Title of the report
    doc.setFontSize(20);
    doc.text("Railway Track Defect Report", 20, 20);

    // Adding defect details to the PDF
    doc.setFontSize(14);
    doc.text(`Defect Type: ${defect.defectType}`, 20, 40);
    doc.text(`Location: ${defect.location}`, 20, 50);
    doc.text(`Kilometer: ${defect.kilometer} km`, 20, 60);
    doc.text(`Severity: ${defect.severity}`, 20, 70);
    doc.text(`Timestamp: ${defect.timestamp}`, 20, 80);

    // Optionally, add more sections
    doc.addPage();
    doc.text("Detailed Defect Description", 20, 20);
    doc.text("This is a detailed explanation of the defect.", 20, 30);

    // Save the PDF with dynamic name
    doc.save(`defect-report-${defect.id}.pdf`);
  };

  const SensorStatus = () => (
    <div className="grid grid-cols-3 gap-4">
      {["Water", "UlrtraSonic", "InfraRed"].map((sensor) => (
        <Card key={sensor} className="bg-[#111827] border-[#1f2937]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">
              {sensor} Sensor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
              <span className="text-sm text-white">Active</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-[#030712]">
      <h1 className="text-2xl font-bold text-white">
        Railway Track Defect Monitoring
      </h1>

      {/* Sensor Status Section */}
      <Card className="bg-[#111827] ">
        <CardHeader>
          <CardTitle className="text-white ">Sensor Status</CardTitle>
        </CardHeader>
        <CardContent>
          <SensorStatus />
        </CardContent>
      </Card>

      <Card className="bg-[#111827] flex flex-col gap-5 p-5">
        <ActiveSensor />
        <SystemStatus />
      </Card>

      {/* Track Visualization Section */}
      <Card className="bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-white">Track Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <TrackVisualization />
        </CardContent>
      </Card>

      {/* Defect Alerts Section */}

      <AlertSection>
        <DefectAlerts />
      </AlertSection>
    </div>
  );
};

export default RailwayDashboard;

function AlertSection({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-gray-900">
      <section>
        <div id="alerts" className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">
                Alert Management
              </h2>
              <p className="text-gray-400">
                Real-time monitoring and alert system
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              Active Alerts (5)
            </button>
          </div>
          <div className="mb-6">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-200">
                      Critical Rail Defect Detected
                    </h3>
                    <p className="text-sm text-red-300">
                      Section B7 - Immediate attention required
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-red-900/30 text-red-200 px-3 py-1 rounded-full">
                  2 min ago
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-red-400">Critical</h3>
                <span className="text-red-400">2</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-yellow-400">Warning</h3>
                <span className="text-yellow-400">3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-400">Monitor</h3>
                <span className="text-blue-400">8</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-400">Resolved</h3>
                <span className="text-green-400">15</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100">
                Active Alerts
              </h3>
            </div>
            <div className="overflow-x-auto">{children}</div>
          </div>
        </div>
      </section>
    </Card>
  );
}

function ActiveSensor() {
  return (
    <Card className="bg-neutral-900 text-neutral-100 p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Active Sensors</p>
              <h3 className="text-2xl font-bold text-blue-400">24/24</h3>
            </div>
            <div className="bg-blue-800/20 p-2 rounded">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Track Coverage</p>
              <h3 className="text-2xl font-bold text-green-400">98.5%</h3>
            </div>
            <div className="bg-green-800/20 p-2 rounded">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Active Alerts</p>
              <h3 className="text-2xl font-bold text-red-400">3</h3>
            </div>
            <div className="bg-red-800/20 p-2 rounded">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">System Health</p>
              <h3 className="text-2xl font-bold text-purple-400">96%</h3>
            </div>
            <div className="bg-purple-800/20 p-2 rounded">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
function SystemStatus() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-neutral-800 p-6 rounded border border-neutral-700">
        <h3 className="text-lg font-semibold mb-4 text-neutral-100">
          System Components Status
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Acoustic Wave Transmitter</span>
            <span className="px-3 py-1 bg-green-800/20 text-green-400 rounded-full text-sm">
              Operational
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Reception Sensors</span>
            <span className="px-3 py-1 bg-green-800/20 text-green-400 rounded-full text-sm">
              Operational
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">AI Analysis Engine</span>
            <span className="px-3 py-1 bg-green-800/20 text-green-400 rounded-full text-sm">
              Active
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-300">Data Processing Unit</span>
            <span className="px-3 py-1 bg-yellow-800/20 text-yellow-400 rounded-full text-sm">
              Optimizing
            </span>
          </div>
        </div>
      </div>

      <div className="bg-neutral-800 p-6 rounded border border-neutral-700">
        <h3 className="text-lg font-semibold mb-4 text-neutral-100">
          Recent Activities
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-neutral-200">
                System health check completed
              </p>
              <p className="text-xs text-neutral-400">10 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-neutral-200">
                Minor wear pattern detected - Section A12
              </p>
              <p className="text-xs text-neutral-400">25 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-neutral-200">
                Acoustic wave calibration performed
              </p>
              <p className="text-xs text-neutral-400">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-neutral-200">
                Alert: Abnormal pattern detected - Section B7
              </p>
              <p className="text-xs text-neutral-400">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
