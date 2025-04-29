document.addEventListener('DOMContentLoaded', () => {
  const screenRefs = document.querySelectorAll('.screen_container');
  const activeIndices = new Set();
  const isMobile = window.innerWidth < 768;

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      const index = Array.from(screenRefs).indexOf(entry.target);
      if (entry.isIntersecting && !activeIndices.has(index)) {
        entry.target.classList.add('animate');
        activeIndices.add(index);
      }
    });
  };

  const mobileObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
  });

  const desktopObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.5
  });

  const specialObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
  });

  screenRefs.forEach(el => {
    const parentId = el.parentElement.id;
    
    if (isMobile) {
      const mobileScreens = [
        'screen_25_3', 'screen_25_2', 'screen_25_4',
        'screen_25_5', 'screen_25_51', 'screen_25_52',
        'screen_25_6', 'screen_25_7', 'screen_25_8',
        'screen_25_10', 'screen_25_12', 'screen_25_9',
        'screen_25_11'
      ];
      
      if (mobileScreens.includes(parentId)) {
        mobileObserver.observe(el);
      }
    } else {
      switch(parentId) {
        case 'screen_25_9':
        case 'screen_25_11':
          specialObserver.observe(el);
          break;
        default:
          desktopObserver.observe(el);
          break;
      }
    }
  });
});