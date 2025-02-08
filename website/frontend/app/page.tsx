"use client";
import React, { useState } from "react";
import { AlertCircle, Download, Map as MapIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RailwayDashboard = () => {
  // Sample data - in real application this would come from sensors
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

      {/* Simplified track representation */}
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

  // Alert component for defects
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

  // Function to handle report download
  const handleDownloadReport = (defect) => {
    // In a real application, this would generate and download a PDF report
    const reportData = `
      Defect Report
      -------------
      Location: ${defect.location}
      Kilometer: ${defect.kilometer}
      Type: ${defect.defectType}
      Severity: ${defect.severity}
      Timestamp: ${defect.timestamp}
    `;

    const blob = new Blob([reportData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `defect-report-${defect.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Sensor Status Panel
  const SensorStatus = () => (
    <div className="grid grid-cols-3 gap-4">
      {["Temperature", "Vibration", "Displacement"].map((sensor) => (
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
    <div className="p-6 space-y-6">
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
        <CardContent>
          <DefectAlerts />
        </CardContent>
      </Card>
    </div>
  );
};

export default RailwayDashboard;
