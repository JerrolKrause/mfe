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

  constructor() {}

  /**
   * Initializes the clickstream service with the provided parameters.
   * @param appId - The ID of the application.
   * @param endpoint - The endpoint for the clickstream analytics service.
   * @param globalAttributes - Optional. Global attributes to be included with every recorded event.
   */
  public init(config: {
    appId: string;
    endpoint: string;
    globalAttributes?: ClickstreamAttribute;
  }) {
    ClickstreamAnalytics.init(config);
    this.initialized = true;
  }

  /**
   * Adds global attributes to be included with every recorded event.
   * @param attributes - The global attributes to be added.
   */
  addGlobalAttribute(attributes: ClickstreamAttribute) {
    if (!this.initialized) {
      console.error('Clickstream has not been initialized yet');
      return;
    }
    ClickstreamAnalytics.setGlobalAttributes(attributes);
  }

  /**
   * Records a clickstream event.
   * @param event - The clickstream event to be recorded.
   */
  trackEvent(event: ClickstreamEvent) {
    if (!this.initialized) {
      console.error('Clickstream has not been initialized yet');
      return;
    }
    ClickstreamAnalytics.record(event);
  }

  /**
   * Sets the user ID for clickstream analytics.
   * @param userId - The user ID to be set.
   */
  setUserId(userId: string | null) {
    if (!this.initialized) {
      console.error('Clickstream has not been initialized yet');
      return;
    }
    ClickstreamAnalytics.setUserId(userId);
  }

  /**
   * Sets user attributes for clickstream analytics.
   * @param attributes - The user attributes to be set.
   */
  setUserAttribute(attributes: ClickstreamAttribute) {
    if (!this.initialized) {
      console.error('Clickstream has not been initialized yet');
      return;
    }
    ClickstreamAnalytics.setUserAttributes(attributes);
  }
}
