export default {
    name: "override-cta-requirements",

    // this code has been copied from
    // https://github.com/discourse/discourse/blob/ca57e18f42967414bd34db12e0e1425eeb75d857/app/assets/javascripts/discourse/initializers/signup-cta.js.es6

    initialize(owner) {
        const session = owner.lookup("service:session");
        const screenTrack = owner.lookup("service:screen-track");
        const siteSettings = owner.lookup("service:site-settings");
        const keyValueStore = owner.lookup("service:key-value-store");
        const user = owner.lookup("service:current-user");
        const appEvents = owner.lookup("service:app-events");

        // Preconditions
        if (user) {
          return;
        } // must not be logged in
        if (keyValueStore.get("anon-cta-never")) {
          return;
        } // "never show again"
        if (!siteSettings.allow_new_registrations) {
          return;
        }
        if (siteSettings.invite_only) {
          return;
        }
        if (siteSettings.login_required) {
          return;
        }
        if (siteSettings.enable_signup_cta) {
          console.log("WARNING: if you use this theme component you MUST disable the enable_signup_cta site setting.")
        }

        function checkOverriddenSignupCtaRequirements() {
          if (session.get("showSignupCta")) {
            return; // already shown
          }

          if (session.get("hideSignupCta")) {
            return; // hidden for session
          }

          if (keyValueStore.get("anon-cta-never")) {
            return; // hidden forever
          }

          const now = Date.now();
          const hiddenAt = keyValueStore.getInt("anon-cta-hidden", 0);
          if (hiddenAt > now - (settings.prompt_hide_duration_minutes * 60000)) {
            return; // hidden in last x minutes
          }

          const readTime = keyValueStore.getInt("anon-topic-time");
          if (readTime < (settings.prompt_read_time_minutes * 60000)) {
            return;
          }

          const topicIdsString = keyValueStore.get("anon-topic-ids");
          if (!topicIdsString) {
            return;
          }
          let topicIdsAry = topicIdsString.split(",");
          if (topicIdsAry.length < settings.prompt_topics) {
            return;
          }
          // Requirements met.
          session.set("showSignupCta", true);
          appEvents.trigger("cta:shown");
        }

        screenTrack.registerAnonCallback(checkOverriddenSignupCtaRequirements);

        checkOverriddenSignupCtaRequirements();
    }
}