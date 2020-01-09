export default class LjhAnalytics {
  static identify(email, traits) {
    if (!traits) {
      traits = {};
    }
    traits.email = email;
    window.analytics && window.analytics.identify(email, traits);
  }
  static track(name, properties) {
    if (!properties) {
      properties = {};
    }
    window.analytics && window.analytics.track(name, properties);
  }
  static page(name, properties) {
    if (!properties) {
      properties = {};
    }
    window.analytics && window.analytics.page(name, properties);
  }
}
