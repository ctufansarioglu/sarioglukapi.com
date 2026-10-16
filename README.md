# Sarıoğlu Orman Ürünleri

React 19, Vite 8, TanStack Router, Emotion ve PhotoSwipe kullanan statik katalog sitesi. GitHub Pages üzerinde `https://sarioglukapi.com` adresinde yayımlanır.

## Geliştirme ve build

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

Build önce istemci dosyalarını `dist/`, ardından yalnızca üretim sırasında kullanılan render modüllerini `dist-ssr/` altında derler. `scripts/prerender.mjs`, her route için ayrı router oluşturarak sekiz sayfayı gerçek içerik ve Emotion stilleriyle HTML'e dönüştürür. Yayımlanacak tek klasör `dist/` olur; sunucu çalışma zamanı gerekmez.

Tarayıcı, HTML'i TanStack Router'ın SSR verileriyle hydrate eder. Geliştirme sunucusunda boş belge istemcide oluşturulur. Mobil menü ve PhotoSwipe JavaScript kullanır; sayfa içeriği ve normal bağlantılar statik HTML'de bulunur.

## Routing ve SEO

- Route dosyaları `src/routes/` altındadır. `src/routeTree.gen.ts` otomatik üretilir ve elle düzenlenmez.
- `src/data/seo.js`, sayfa title/description kayıtlarını, domain'i ve canonical URL politikasını yönetir. Kategori SEO kayıtları mevcut kategori verilerinden oluşturulur.
- Her sayfanın route `head` tanımı `pageHead` kullanır. Yeni sayfa eklerken route ile SEO kaydı birlikte eklenmelidir; build bunların eşleşmesini denetler.
- Canonical adresler ve iç bağlantılar `/kurumsal/` gibi sonu slash ile biten URL'leri kullanır. Alt sayfalar `dist/<route>/index.html` olarak üretilir; mevcut slash'siz adreslerin GitHub Pages üzerindeki dizin yönlendirmesi yayın sonrası kontrol edilmelidir.
- `sitemap.xml` ve `robots.txt` aynı sayfa listesinden otomatik üretilir. `404.html` gerçek bulunamadı içeriği taşır ve `noindex` kullanır.
- Footer yılı build sırasında sabitlenir; ziyaretçinin tarihinin değişmesi hydration uyuşmazlığı oluşturmaz. Yılın güncellenmesi yeni build gerektirir.

## Doğrulama

`pnpm build`, route/SEO eşleşmesini, benzersiz title ve description değerlerini, HTML başlık ve canonical etiketlerini, kategori ürün sayılarını, 404 durumunu ve HTML'deki yerel dosya/bağlantı hedeflerini kontrol eder. Bir kontrol başarısızsa build hata verir.

Tarayıcıda JavaScript kapalı içerik ve stil erişimini; JavaScript açıkken hydration konsolunu, route geçişlerinde SEO güncellemelerini, geri/ileri gezinmeyi, mobil menüyü ve önbellekteki görsellerle PhotoSwipe davranışını kontrol edin. `pnpm preview` Vite'ın SPA fallback davranışını kullanabilir; gerçek 404 ve dizin yönlendirmesi kabul kontrolleri için SPA fallback uygulamayan statik sunucu veya GitHub Pages kullanılmalıdır.

`.github/workflows/deploy.yml`, `pnpm build` sonrasında yalnızca `dist/` klasörünü yükler. Yayın sonrası sekiz sayfanın son HTTP yanıtının 200, bilinmeyen adreslerin 404 olduğunu; HTTPS, sitemap, robots.txt ve asset erişimini doğrulayın.

Ayrıntılı plan ve uygulama notları: [docs/ssg-migration-plan.md](docs/ssg-migration-plan.md).
