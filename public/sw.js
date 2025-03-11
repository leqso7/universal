// სერვის ვორკერის ვერსია - შეცვალეთ ეს ნომერი ყოველ ჯერზე, როცა განაახლებთ კეშს
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `universal-cache-${CACHE_VERSION}`;

// ფაილები, რომლებიც უნდა დაკეშირდეს აპლიკაციის ინსტალაციისას
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './vite.svg',
  './src/main.tsx',
  './src/App.tsx',
  './icons/apple-touch-icon.png',
  './icons/apple-touch-icon-152x152.png',
  './icons/apple-touch-icon-167x167.png',
  './icons/apple-touch-icon-180x180.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/maskable_icon.png'
];

// სერვის ვორკერის ინსტალაცია
self.addEventListener('install', event => {
  console.log('🟢 სერვის ვორკერი ინსტალირდება...');
  
  // დავაკეშიროთ საჭირო ფაილები
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🟢 კეში გაიხსნა, ვაკეშირებთ ფაილებს');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('🟢 ფაილები წარმატებით დაკეშირდა');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('🔴 კეშირების შეცდომა:', error);
      })
  );
});

// სერვის ვორკერის აქტივაცია
self.addEventListener('activate', event => {
  console.log('🟢 სერვის ვორკერი აქტივირდა');
  
  // წავშალოთ ძველი კეშები
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('universal-cache-') && cacheName !== CACHE_NAME;
          }).map(cacheName => {
            console.log(`🟠 ვშლით ძველ კეშს: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log('🟢 სერვის ვორკერი მზადაა მოთხოვნების დასამუშავებლად');
        return self.clients.claim();
      })
  );
});

// მოთხოვნების დამუშავება
self.addEventListener('fetch', event => {
  // ვამოწმებთ არის თუ არა მოთხოვნა ნავიგაციის მოთხოვნა (HTML გვერდისთვის)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // თუ ვერ მოვიპოვეთ ინტერნეტიდან, დავაბრუნოთ კეშიდან
          console.log('🟠 ნავიგაციის მოთხოვნა ვერ შესრულდა, ვიყენებთ კეშს');
          return caches.match('./index.html');
        })
    );
    return;
  }
  
  // სტანდარტული "cache-first" სტრატეგია სხვა მოთხოვნებისთვის
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // თუ მოთხოვნა ნაპოვნია კეშში, დავაბრუნოთ კეშირებული პასუხი
        if (cachedResponse) {
          console.log(`🟢 მოთხოვნა ნაპოვნია კეშში: ${event.request.url}`);
          return cachedResponse;
        }
        
        // თუ არ არის კეშში, მოვითხოვოთ ქსელიდან
        console.log(`🟠 მოთხოვნა არ არის კეშში, ვიყენებთ ქსელს: ${event.request.url}`);
        return fetch(event.request)
          .then(response => {
            // დავაბრუნოთ პასუხი და ასევე დავაკეშიროთ
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // დავაკეშიროთ პასუხი
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log(`🟢 მოთხოვნა დაკეშირდა: ${event.request.url}`);
              });
            
            return response;
          })
          .catch(error => {
            console.error(`🔴 მოთხოვნის შეცდომა: ${event.request.url}`, error);
            // აქ შეგვიძლია დავამატოთ ფოლბეკი კონკრეტული ტიპის ფაილებისთვის
            if (event.request.url.includes('.png') || event.request.url.includes('.jpg') || event.request.url.includes('.svg')) {
              return caches.match('./vite.svg');
            }
          });
      })
  );
});

// პუშ შეტყობინებების მიღება
self.addEventListener('push', event => {
  console.log('🟢 მიღებულია პუშ შეტყობინება:', event.data.text());
  
  const title = 'Universal';
  const options = {
    body: event.data.text(),
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-192x192.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// შეტყობინებაზე დაჭერის დამუშავება
self.addEventListener('notificationclick', event => {
  console.log('🟢 შეტყობინებაზე დაჭერა');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// სინქრონიზაციის ივენთის დამუშავება
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('🟢 სინქრონიზაციის მოთხოვნა: sync-data');
    // აქ შეგვიძლია დავამუშაოთ ფონური სინქრონიზაცია
  }
});

console.log('🟢 სერვის ვორკერი ჩაიტვირთა');
