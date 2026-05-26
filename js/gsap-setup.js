const gsapPlugins = [];

if (typeof ScrollTrigger !== 'undefined') gsapPlugins.push(ScrollTrigger);
if (typeof SplitText !== 'undefined') gsapPlugins.push(SplitText);
if (typeof CustomEase !== 'undefined') gsapPlugins.push(CustomEase);

if (gsapPlugins.length) {
  gsap.registerPlugin(...gsapPlugins);
}

CustomEase.create("machado", "0.16, 1, 0.3, 1");
CustomEase.create("snap",    "0.87, 0, 0.13, 1");
CustomEase.create("wipe",    "0.76, 0, 0.24, 1");

if (typeof ScrollTrigger !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
}
