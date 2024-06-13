import { Injectable } from '@angular/core';
import { ClickstreamAnalytics } from '@aws/clickstream-web';
import {
  ClickstreamAttribute,
  ClickstreamEvent,
} from '@aws/clickstream-web/lib-esm/types';

/**
 * Service for providing AWS Clickstream analytics to track user behavior in a web application.
 * @remarks
 * This service utilizes the AWS Clickstream Analytics SDK to capture and record user interactions.
 * @see {@link https://docs.aws.amazon.com/solutions/latest/clickstream-analytics-on-aws/web-sdk.html | AWS Clickstream Analytics SDK}
 */
@Injectable({ providedIn: 'root' })
export class ClickstreamService {
  /** Indicates whether the clickstream service has been initialized. */
  private initialized = false;
  /** Array to store events before initialization. */
  private storedEvents: ClickstreamEvent[] = [];

  constructor() {}

  /**
   * Initializes the clickstream service with the provided parameters.
   * @param appId - The ID of the application.
   * @param endpoint - The endpoint for the clickstream analytics service.
   * @param globalAttributes - Optional. Global attributes to be included with every recorded event.
   * @example
   * ```typescript
   * clickstreamService.init({
   *   appId: 'yourAppId',
   *   endpoint: 'yourEndpoint',
   *   globalAttributes: {
   *     userRole: 'admin',
   *     locale: 'en-US'
   *   }
   * });
   * ```
   */
  public init(config: {
    appId: string;
    endpoint: string;
    globalAttributes?: ClickstreamAttribute;
  }) {
    ClickstreamAnalytics.init(config);
    this.initialized = true;
    // Fire stored events after initialization
    this.storedEvents.forEach((event) => this.trackEvent(event));
    // Clear stored events
    this.storedEvents = [];
  }

  /**
   * Adds global attributes to be included with every recorded event.
   * @param attributes - The global attributes to be added.
   * @example
   * ```typescript
   * clickstreamService.addGlobalAttribute({
   *   userRole: 'admin',
   *   locale: 'en-US'
   * });
   * ```
   */
  addGlobalAttribute(attributes: ClickstreamAttribute) {
    if (!this.initialized) {
      this.storeDelayedMethodCall(() =>
        ClickstreamAnalytics.setGlobalAttributes(attributes)
      );
      return;
    }
    ClickstreamAnalytics.setGlobalAttributes(attributes);
  }

  /**
   * Records a clickstream event.
   * @param event - The clickstream event to be recorded.
   * @example
   * ```typescript
   * clickstreamService.trackEvent({
   *   name: 'PageView',
   *   attributes: {
   *     pageName: 'Home',
   *     pageTitle: 'Welcome to our website'
   *   }
   * });
   * ```
   */
  trackEvent(event: ClickstreamEvent) {
    if (!this.initialized) {
      this.storeDelayedMethodCall(() => ClickstreamAnalytics.record(event));
      return;
    }
    ClickstreamAnalytics.record(event);
  }

  /**
   * Sets the user ID for clickstream analytics.
   * @param userId - The user ID to be set.
   * @example
   * ```typescript
   * clickstreamService.setUserId('12345');
   * ```
   */
  setUserId(userId: string | null) {
    if (!this.initialized) {
      this.storeDelayedMethodCall(() => ClickstreamAnalytics.setUserId(userId));
      return;
    }
    ClickstreamAnalytics.setUserId(userId);
  }

  /**
   * Sets user attributes for clickstream analytics.
   * @param attributes - The user attributes to be set.
   * @example
   * ```typescript
   * clickstreamService.setUserAttribute({
   *   age: 30,
   *   gender: 'male'
   * });
   * ```
   */
  setUserAttribute(attributes: ClickstreamAttribute) {
    if (!this.initialized) {
      this.storeDelayedMethodCall(() =>
        ClickstreamAnalytics.setUserAttributes(attributes)
      );
      return;
    }
    ClickstreamAnalytics.setUserAttributes(attributes);
  }

  /**
   * Stores a method call to be executed after initialization.
   * @param method - The method to be executed.
   */
  private storeDelayedMethodCall(method: () => void) {
    this.storedEvents.push(method);
  }
}
