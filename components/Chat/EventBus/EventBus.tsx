import React, { createContext, useContext, ReactNode } from 'react';

interface CQEDEventBus {
  subscribeEvent: (event: string, handler: EventHandler) => void;
  unsubscribeEvent: (event: string, handler: EventHandler) => void;
  dispatchEvent: (event: string, data: any) => void;
}

type EventHandler = (data: any) => void;

const EventBusContext = createContext<CQEDEventBus | undefined>(undefined);

let eventHandlers: { [key: string]: EventHandler[] } = {};

const setEventHandlers = (event: string, handler: EventHandler) => {
  eventHandlers[event] = [...(eventHandlers[event] || []), handler];
};

export const subscribeEvent = setEventHandlers;

export const dispatchEvent = (event: string, data: any = {}) => {
  const handlers = eventHandlers[event] || [];

  handlers.forEach((handler) => handler(data));
};

export const unsubscribeEvent = (event: string, handler: EventHandler) => {
  if (!eventHandlers[event]) return;
  eventHandlers[event] = eventHandlers[event].filter((h) => h !== handler);
};

export const useEventBus = (): CQEDEventBus => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }
  return context;
};

interface EventBusProviderProps {
  children: ReactNode;
}

export const EventBusProvider: React.FC<EventBusProviderProps> = ({ children }) => {
  return (
    <EventBusContext.Provider
      value={{ subscribeEvent, unsubscribeEvent, dispatchEvent }}
    >
      {children}
    </EventBusContext.Provider>
  );
};
