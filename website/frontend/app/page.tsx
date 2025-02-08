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
    <div className="relative h-64 w-full bg-blue-100 rounded-lg p-4">
      <div className="absolute top-4 left-4">
        <MapIcon className="text-blue-500" size={24} />
        <span className="ml-2 text-sm text-blue-600">Track Map View</span>
      </div>

      <div className="absolute top-1/2 left-0 right-0 h-4 bg-blue-300">
        {sensorData.map((defect) => (
          <div
            key={defect.id}
            className="absolute h-4 w-4 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${parseInt(defect.kilometer) * 2}%`,
              transform: "translateX(-50%)",
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
          variant={defect.severity === "High" ? "destructive" : "default"}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="flex justify-between items-center">
            {defect.defectType}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadReport(defect)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </AlertTitle>
          <AlertDescription>
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
        <Card key={sensor}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{sensor} Sensor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
              <span className="text-sm">Active</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-teal-200">
      <h1 className="text-2xl font-bold">Railway Track Defect Monitoring</h1>

      {/* Sensor Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Status</CardTitle>
        </CardHeader>
        <CardContent>
          <SensorStatus />
        </CardContent>
      </Card>

      {/* Track Visualization Section */}
      <Card>
        <CardHeader>
          <CardTitle>Track Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <TrackVisualization />
        </CardContent>
      </Card>

      {/* Defect Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Active Defect Alerts</CardTitle>
        </CardHeader>
        <CardContent>{/* <DefectAlerts /> */}</CardContent>
      </Card>
      <AlertSection>
        <DefectAlerts />
      </AlertSection>
    </div>
  );
};

export default RailwayDashboard;

function AlertSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-slate-200">
      <div id="alerts" className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Alert Management
            </h2>
            <p className="text-gray-600">
              Real-time monitoring and alert system
            </p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">
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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
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
                  <h3 className="font-semibold text-red-800">
                    Critical Rail Defect Detected
                  </h3>
                  <p className="text-sm text-red-600">
                    Section B7 - Immediate attention required
                  </p>
                </div>
              </div>
              <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full">
                2 min ago
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded border border-neutral-200/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-red-600">Critical</h3>
              <span className="text-red-600">2</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: "20%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-neutral-200/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-yellow-600">Warning</h3>
              <span className="text-yellow-600">3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-neutral-200/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-blue-600">Monitor</h3>
              <span className="text-blue-600">8</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-neutral-200/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-600">Resolved</h3>
              <span className="text-green-600">15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded border border-neutral-200/20 overflow-hidden">
          <div className="p-4 border-b border-neutral-200/20">
            <h3 className="text-lg font-semibold">Active Alerts</h3>
          </div>
          <div className="overflow-x-auto">{children}</div>
        </div>
      </div>
    </section>
  );
}
