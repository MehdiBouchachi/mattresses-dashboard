import { useEffect } from "react";
import { useSetting } from "./useSetting";

function MetaPixelScript() {
  const { setting, isLoading } = useSetting("meta_pixel_id");

  useEffect(() => {
    if (isLoading || !setting?.value) return;

    const pixelId = setting.value;

    // Prevent double-injection
    if (window.fbq) return;

    // eslint-disable-next-line no-unused-expressions
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
    );

    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }, [setting, isLoading]);

  // No visible UI
  return null;
}

export default MetaPixelScript;
