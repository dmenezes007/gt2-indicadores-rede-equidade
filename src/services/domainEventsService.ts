import { DomainEvent } from '../types/dataModels';

// In-memory event log for auditability & n8n / webhook dispatcher
class DomainEventsService {
  private events: DomainEvent[] = [];
  private listeners: ((event: DomainEvent) => void)[] = [];

  public emitDomainEvent(
    eventName: DomainEvent['eventName'],
    payload: Record<string, unknown>
  ): DomainEvent {
    const event: DomainEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      eventName,
      payload,
    };

    this.events.unshift(event);

    // Keep up to 200 events in memory
    if (this.events.length > 200) {
      this.events = this.events.slice(0, 200);
    }

    // Notify listeners
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Error in domain event listener:', err);
      }
    });

    return event;
  }

  public getRecentEvents(limit = 50): DomainEvent[] {
    return this.events.slice(0, limit);
  }

  public subscribe(listener: (event: DomainEvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public clear(): void {
    this.events = [];
  }
}

export const domainEventsService = new DomainEventsService();
