// Service Worker
const CACHE_NAME = 'class-manager-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Don't cache API calls
                if (!event.request.url.includes('supabase.co')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
          // If fetch fails (offline), try to return cached response
          return caches.match(event.request);
        });
      })
  );
});

// Background Sync რეგისტრაცია
self.addEventListener('sync', function(event) {
  if (event.tag === 'status-check') {
    event.waitUntil(checkStatusInBackground());
  }
});

async function checkStatusInBackground() {
  const userCode = await getFromCache('userCode');
  if (!userCode) return;

  try {
    const response = await fetch('https://loyzwjzsjnikmnuqilmv.functions.supabase.co/access-manager/status?code=' + userCode, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    
    if (data.error || data.status === 'blocked') {
      // ვშლით ყველა ქეშირებულ მონაცემს
      await clearUserData();
      return;
    }

    if (data.status === 'approved') {
      await saveToCache('approvalStatus', 'approved');
      await saveToCache('statusTimestamp', Date.now().toString());
      await saveToCache('wasEverApproved', 'true');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getFromCache(key) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(`cache-${key}`);
  if (response) {
    const data = await response.text();
    return data;
  }
  return null;
}

async function saveToCache(key, value) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(
    `cache-${key}`,
    new Response(value)
  );
}

async function clearUserData() {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete('cache-userCode');
  await cache.delete('cache-approvalStatus');
  await cache.delete('cache-statusTimestamp');
  await cache.delete('cache-wasEverApproved');
}
