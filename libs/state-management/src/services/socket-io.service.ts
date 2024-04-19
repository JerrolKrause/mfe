// Import necessary modules from Angular and Socket.IO client
import { Injectable } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;
  private listeners: Record<string, boolean> = {}; // Record to track registered event listeners

  private sub: Subscription | null = null;
  /**
   * Initialize SocketIO
   * @param apiUrl - Location of socket API server
   */
  initialize(apiUrl: string) {
    this.socket = io(apiUrl);
    // Disconnect on refresh/window unload
    this.sub = fromEvent(window, 'beforeunload').subscribe(() =>
      this.disconnect()
    );
  }

  /**
   * Registers the user with the server by sending the user ID.
   * @param userId The unique identifier for the user.
   */
  registerUser(userId: string): void {
    if (!this.socket) {
      console.error('Socket.io API not initialized yet');
      return;
    }
    this.socket.emit('register', userId);
  }

  /**
   * Sends a message to a specific user through the server.
   * @param userId The user ID of the recipient.
   * @param message The message to be sent.
   */
  sendMessageToUser(userId: string, message: string) {
    if (!this.socket) {
      console.error('Socket.io API not initialized yet');
      return;
    }
    return this.socket.emit('messageToUser', { userId, message });
  }

  /**
   * Subscribes to messages from the server intended for this client.
   * @param callback Function to execute when a message is received.
   */
  onMessageReceived(callback: (message: string) => void) {
    if (!this.socket) {
      console.error('Socket.io API not initialized yet');
      return;
    }
    return this.socket.on('messageFromServer', callback);
  }

  /**
   * Subscribes to messages from the server intended for this client.
   * Ensures each event type is only listened to once to prevent duplicate handlers.
   * @param eventName The name of the event to listen for.
   * @param callback Function to execute when the event is received.
   */
  onEvent(eventName: string, callback: (data: unknown) => void): void {
    if (!this.socket) {
      console.error('Socket.io API not initialized yet');
      return;
    }
    if (!this.listeners[eventName]) {
      this.socket.on(eventName, callback);
      this.listeners[eventName] = true;
    }
  }

  /**
   * Disconnects from the Socket.IO server and removes all listeners to prevent memory leaks.
   */
  disconnect(): void {
    if (!this.socket) {
      return;
    }
    Object.keys(this.listeners).forEach((eventName) =>
      this.socket?.off(eventName)
    );
    this.socket.disconnect();
    this.listeners = {};
    this.sub?.unsubscribe();
  }
}
