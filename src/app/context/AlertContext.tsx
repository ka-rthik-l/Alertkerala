import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

export type AlertMetrics = {
  notified: number;
  viewed: number;
  shared: number;
  active: number;
  sightings: number;
  verified: number;
  rate: number;
  radius: number;
};

export type Sighting = {
  id: number;
  label: string;
  lat: number;
  lng: number;
  verified: boolean;
  isLastSeen?: boolean;
  time: string;
};

export type Alert = {
  id: string;
  name: string;
  age: number;
  location: string;
  time: string;
  image: string;
  description: string;
  metrics: AlertMetrics;
  sightings: Sighting[];
  coordinates: [number, number];
  status: string;
};

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'metrics' | 'status'>) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const INITIAL_ALERTS: Alert[] = [
  {
    id: "1",
    name: "Aarav Kumar",
    age: 8,
    location: "Marine Drive, Kochi",
    time: "2h 14m",
    status: "active",
    image: "https://images.unsplash.com/photo-1741805190461-eeda3ba59bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGQlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc3MzQ1ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Blue t-shirt with cartoon character, khaki shorts, red sneakers. Brown hair, medium complexion.",
    coordinates: [9.9796, 76.2796],
    metrics: {
      notified: 45,
      viewed: 32,
      shared: 12,
      active: 8,
      sightings: 3,
      verified: 1,
      rate: 71.1,
      radius: 2.8
    },
    sightings: [
      {
        id: 1,
        label: "Marine Drive, Kochi",
        lat: 9.9796,
        lng: 76.2796,
        verified: true,
        isLastSeen: true,
        time: "2h 14m"
      },
      {
        id: 2,
        label: "Kaloor Stadium",
        lat: 9.9873,
        lng: 76.2930,
        verified: true,
        time: "2m"
      },
      {
        id: 3,
        label: "Palarivattom",
        lat: 9.9942,
        lng: 76.3091,
        verified: false,
        time: "28m"
      }
    ]
  },
  {
    id: "2",
    name: "Priya Nair",
    age: 15,
    location: "Fort Kochi",
    time: "5h 30m",
    status: "active",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfHx8fDE3NzM0NjExMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "White kurta, blue jeans. Black hair, tall. Last seen near the ferry terminal.",
    coordinates: [9.9658, 76.2421],
    metrics: {
      notified: 86,
      viewed: 64,
      shared: 28,
      active: 12,
      sightings: 5,
      verified: 2,
      rate: 74.4,
      radius: 4.5
    },
    sightings: [
      {
        id: 1,
        label: "Fort Kochi",
        lat: 9.9658,
        lng: 76.2421,
        verified: true,
        isLastSeen: true,
        time: "5h 30m"
      },
      {
        id: 2,
        label: "Mattancherry",
        lat: 9.9567,
        lng: 76.2589,
        verified: true,
        time: "1h 15m"
      },
      {
        id: 3,
        label: "Thopumpady",
        lat: 9.9389,
        lng: 76.2592,
        verified: false,
        time: "45m"
      }
    ]
  }
];

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // Background metric progression
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAlerts(prevAlerts => prevAlerts.map(alert => {
        // Increment metrics dynamically over time randomly
        const metricBoost = Math.random() > 0.6;
        if (metricBoost) {
          return {
            ...alert,
            metrics: {
              ...alert.metrics,
              notified: alert.metrics.notified + Math.floor(Math.random() * 3),
              viewed: alert.metrics.viewed + Math.floor(Math.random() * 2),
              shared: alert.metrics.shared + (Math.random() > 0.8 ? 1 : 0),
              active: alert.metrics.active + (Math.random() > 0.9 ? 1 : 0),
            }
          };
        }
        return alert;
      }));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'metrics' | 'status'>) => {
    const newAlert: Alert = {
      ...newAlertData,
      id: Math.random().toString(36).substring(7),
      status: "active",
      metrics: {
        notified: 0,
        viewed: 0,
        shared: 0,
        active: 0,
        sightings: 0,
        verified: 0,
        rate: 0,
        radius: 5
      }
    };
    
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}
