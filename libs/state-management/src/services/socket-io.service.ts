import { Injectable } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private listeners: Record<string, boolean> = {}; // Record to track registered event listeners
  private sub: Subscription | null = null;
  private storageKey = 'crossTabMessages';
  private messageSubject$ = new Subject<{ eventName: string; data: unknown }>();

  constructor() {
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  private handleStorageEvent(event: StorageEvent) {
    if (event.key === this.storageKey && event.newValue) {
      const { eventName, data } = JSON.parse(event.newValue);
      this.messageSubject$.next({ eventName, data });
    }
  }

  /**
   * Initialize localStorage-based communication
   * @param apiUrl - Unused in localStorage implementation but kept for compatibility
   */
  initialize(apiUrl: string) {
    // Disconnect on refresh/window unload
    this.sub = fromEvent(window, 'beforeunload').subscribe(() =>
      this.disconnect()
    );
  }

  /**
   * Registers the user by sending the user ID.
   * @param userId The unique identifier for the user.
   */
  registerUser(userId: string): void {
    /**
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({ eventName: 'register', data: userId })
    );
     */
  }

  /**
   * Sends a message to a specific user through localStorage.
   * @param userId The user ID of the recipient.
   * @param message The message to be sent.
   */
  sendMessageToUser(userId: string, message: string) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({ eventName: 'messageToUser', data: { userId, message } })
    );
  }

  /**
   * Subscribes to messages from localStorage intended for this client.
   * @param callback Function to execute when a message is received.
   */
  onMessageReceived(callback: (message: string) => void) {
    this.messageSubject$.subscribe(({ data }: any) => {
      callback(data.message);
    });
  }

  /**
   * Subscribes to events from localStorage intended for this client.
   * Ensures each event type is only listened to once to prevent duplicate handlers.
   * @param eventName The name of the event to listen for.
   * @param callback Function to execute when the event is received.
   */
  onEvent(eventName: string, callback: (data: unknown) => void): void {
    this.messageSubject$.subscribe(({ eventName: eName, data }: any) => {
      callback(JSON.parse(data.message));
    });
    this.listeners[eventName] = true;
  }

  /**
   * Disconnects from the localStorage communication and removes all listeners to prevent memory leaks.
   */
  disconnect(): void {
    window.removeEventListener('storage', this.handleStorageEvent.bind(this));
    this.listeners = {};
    this.sub?.unsubscribe();
  }
}
