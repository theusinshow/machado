export function initYoutubeFacade() {
  const buttons = document.querySelectorAll('[data-yt]');
  if (!buttons.length) return;

  // Lazy-load the muted preview video only when visible
  buttons.forEach((btn) => {
    const video = btn.querySelector('video[data-src]');
    if (video) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.src = video.dataset.src;
              video.play().catch(() => {});
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );
      observer.observe(btn);
    }

    btn.addEventListener('click', () => {
      const id = btn.dataset.yt;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&color=white`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.className = 'sobre-yt__iframe';
      iframe.title = btn.getAttribute('aria-label') || 'Vídeo institucional';
      btn.replaceWith(iframe);
    }, { once: true });
  });
}
