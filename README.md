## Override CTA requirements theme component

The signup CTA in Discourse uses hard coded values (described [here](https://meta.discourse.org/t/showing-signup-cta-quickly/137016/4)) to determine whether the CTA must be shown.

This component allows a site administrator to override these values by offering settings for the three variables that were previously hard coded:​

- `prompt read time minutes`: the amount of reading time in minutes before the CTA is triggered​
- `prompt topics`: the number of topics that must be read before the CTA is triggered
- `prompt hide duration minutes`: the amount of time the CTA is hidden when it is dismissed.

There is also a `console decision logging` setting. When it is enabled it will log the variables that are being evaluated when determining whether the CTA should be shown or not.

When this component is active, the native evalution logic in core must be disabled by unchecking the `enable_signup_cta` site setting.

This theme component also works with the [Signup Banner](https://meta.discourse.org/t/signup-banner/210745) theme component.



