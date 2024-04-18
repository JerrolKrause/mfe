// Import necessary modules from Angular and Socket.IO client
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private listeners: Record<string, boolean> = {}; // Record to track registered event listeners

  constructor() {
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:3000');
  }

  /**
   * Registers the user with the server by sending the user ID.
   * @param userId The unique identifier for the user.
   */
  registerUser(userId: string): void {
    console.log('registerUser', userId);
    this.socket.emit('register', userId);
  }

  /**
   * Sends a message to a specific user through the server.
   * @param userId The user ID of the recipient.
   * @param message The message to be sent.
   */
  sendMessageToUser(userId: string, message: string): void {
    this.socket.emit('messageToUser', { userId, message });
  }

  /**
   * Subscribes to messages from the server intended for this client.
   * @param callback Function to execute when a message is received.
   */
  onMessageReceived(callback: (message: string) => void): void {
    this.socket.on('messageFromServer', callback);
  }

  /**
   * Subscribes to messages from the server intended for this client.
   * Ensures each event type is only listened to once to prevent duplicate handlers.
   * @param eventName The name of the event to listen for.
   * @param callback Function to execute when the event is received.
   */
  onEvent(eventName: string, callback: (data: any) => void): void {
    if (!this.listeners[eventName]) {
      this.socket.on(eventName, callback);
      this.listeners[eventName] = true;
    }
  }

  /**
   * Disconnects from the Socket.IO server and removes all listeners to prevent memory leaks.
   */
  disconnect(): void {
    console.log('disconnecting');
    if (this.socket) {
      Object.keys(this.listeners).forEach((eventName) => {
        this.socket.off(eventName);
      });
      this.socket.disconnect();
      this.listeners = {};
    }
  }
}
