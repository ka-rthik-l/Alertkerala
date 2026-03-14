import { useState } from "react";
import { Link } from "react-router";
import { Shield, MapPin, Eye, Users, Clock, Activity, AlertCircle, Radio } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AuthorityDashboard() {
  const [activeAlerts] = useState([
    { 
      id: 1, 
      name: "Aarav Kumar", 
      age: 8, 
      location: "Marine Drive, Kochi", 
      time: "2h 14m", 
      sightings: 3,
      status: "active"
    },
    { 
      id: 2, 
      name: "Priya Nair", 
      age: 15, 
      location: "Fort Kochi", 
      time: "45m", 
      sightings: 1,
      status: "active"
    },
  ]);

  const [sightings] = useState([
    { id: 1, alertId: 1, location: "Kaloor Stadium", time: "2 min ago", verified: false },
    { id: 2, alertId: 1, location: "Edappally Junction", time: "15 min ago", verified: true },
    { id: 3, alertId: 1, location: "Palarivattom", time: "28 min ago", verified: true },
    { id: 4, alertId: 2, location: "Mattancherry", time: "5 min ago", verified: false },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white border-b border-blue-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">AlertKerala Command Center</h1>
                <div className="text-sm text-blue-100">Authority Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded-full text-sm">
                <Activity className="w-4 h-4" />
                System Active
              </div>
              <Link 
                to="/report"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                New Alert
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="bg-blue-800 px-6 py-3 border-t border-blue-700">
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs text-blue-200">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-blue-200">Total Sightings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2,486</div>
              <div className="text-xs text-blue-200">Civilians Notified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-blue-200">Active Responders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.2s</div>
              <div className="text-xs text-blue-200">Avg Response</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Active Alerts */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Active Alerts
            </h2>
            <div className="space-y-2">
              {activeAlerts.map(alert => (
                <Link
                  key={alert.id}
                  to={`/response/${alert.id}`}
                  className="block bg-red-50 border border-red-200 rounded-lg p-3 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{alert.name}</div>
                      <div className="text-sm text-gray-600">Age {alert.age}</div>
                    </div>
                    <div className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      ACTIVE
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.time} ago
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {alert.sightings} sightings
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sightings List */}
          <div className="p-4">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Recent Sightings
            </h2>
            <div className="space-y-2">
              {sightings.map(sighting => (
                <div
                  key={sighting.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${sighting.verified ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                      <div className="font-medium text-gray-900">{sighting.location}</div>
                    </div>
                    {sighting.verified && (
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {sighting.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Civilian Responses */}
          <div className="p-4 border-t border-gray-200">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Civilian Activity
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-gray-600">Alert views</span>
                <span className="font-bold text-blue-900">2,486</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-gray-600">Active searchers</span>
                <span className="font-bold text-green-900">143</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-gray-600">Shares</span>
                <span className="font-bold text-yellow-900">892</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1756376651607-50380a2fa9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBrb2NoaSUyMGNpdHklMjBtYXAlMjBhZXJpYWx8ZW58MXx8fHwxNzczNDU4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kochi Map"
              className="w-full h-full object-cover opacity-40"
            />

            {/* Map Controls */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="text-sm font-medium text-gray-900 mb-2">Map Legend</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Last seen location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Verified sighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Unverified sighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-400 rounded-full"></div>
                  <span className="text-gray-600">Search radius</span>
                </div>
              </div>
            </div>

            {/* Live Updates Indicator */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
              <Radio className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-900">Live Updates Active</span>
            </div>

            {/* Map Markers */}
            <div className="absolute inset-0">
              {/* Center - Last seen location */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-64 h-64 border-4 border-red-400 rounded-full opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-500 rounded-full p-3">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sighting markers */}
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
            </div>

            {/* Alert Timeline */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Alert Timeline</h3>
              <div className="flex gap-4 overflow-x-auto">
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-xs text-gray-600">Alert sent</div>
                  <div className="text-xs font-medium">2:14 PM</div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-600">1,243 notified</div>
                  <div className="text-xs font-medium">2:14 PM</div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Eye className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-600">First sighting</div>
                  <div className="text-xs font-medium">2:46 PM</div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Eye className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-600">2nd sighting</div>
                  <div className="text-xs font-medium">2:59 PM</div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Eye className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="text-xs text-gray-600">3rd sighting</div>
                  <div className="text-xs font-medium">4:26 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
