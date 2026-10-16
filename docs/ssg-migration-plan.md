# Statik HTML (SSG/prerendering) geçiş planı

## Kapsam ve hedef

React, Vite ve TanStack Router yapısını koruyarak sayfaların build sırasında gerçek içerik içeren HTML dosyalarına dönüştürülmesi hedeflenir. İçerik ve temel bağlantılar JavaScript olmadan erişilebilir olacak; mobil menü ve PhotoSwipe gibi etkileşimler hydration sonrasında çalışacaktır.

Her sayfaya özgün title, meta description ve canonical URL eklenecek; sitemap.xml ve robots.txt otomatik üretilecektir. Tasarım, dosya tabanlı routing ve GitHub Pages deployment akışı korunacaktır.

Bu belge uygulama planıdır. Analiz sırasında kaynak kodu değiştirilmedi ve build çalıştırılmadı. Aşağıdaki uyumluluk kontrolleri henüz uygulanmış veya başarılı olmuş kabul edilmemelidir.

## Mevcut mimari ve analiz bulguları

- `package.json` bağımlılık aralıkları: React ve React DOM `^19.2.8`, Vite `^8.3.0`, `@tanstack/react-router` `^1.170.38`, `@tanstack/router-plugin` `^1.168.40`, Emotion React `^11.14.0`, Emotion styled `^11.14.1` ve PhotoSwipe `^5.4.4`. Bunlar manifest aralıklarıdır; uygulamada kilit dosyasındaki çözümlenen sürümler esas alınmalıdır.
- Sekiz sabit sayfa vardır: `/`, `/kurumsal`, `/iletisim`, `/ahsap-dograma-kapi-modelleri`, `/amerikan-panel-kapi-modelleri`, `/lake-kapi-modelleri`, `/melamin-kapi-modelleri` ve `/pvc-kapi-modelleri`.
- Route dosyaları `src/routes/` altında bulunur; `src/routeTree.gen.ts` üretilen route ağacıdır. `vite.config.js`, TanStack Router eklentisini React eklentisinden önce çalıştırır ve `autoCodeSplitting: true` kullanır. Vite `base` değeri `/` olarak ayarlanmıştır.
- İçerikler yereldir. `src/data/categories.js` kategori ve ürün verilerini oluşturur; `src/data/categoryImages.js` görselleri eager `import.meta.glob` ile yükler. İncelenen sayfalarda API veya sunucu gerektiren veri yükleme akışı yoktur.
- `src/main.jsx`, router'ı modül düzeyinde oluşturur ve yalnızca `#root` boşsa `createRoot` çağırır. Hazır HTML geldiğinde hydration yapmaz.
- `index.html` boş `#root`, ortak `Sarıoğlu Ahşap` başlığı ve `lang="en"` içerir. Meta description ve canonical bulunmaz; route bazlı SEO tanımları yoktur.
- `src/routes/__root.jsx`, Emotion `ThemeProvider`, `GlobalStyles` ve ortak `SiteLayout` bileşenini içerir.
- `src/hooks/usePhotoSwipeGallery.js`, PhotoSwipe Lightbox'ı modül düzeyinde import eder; başlatma, DOM işlemleri ve temizleme `useEffect` içinde gerçekleşir. Ana PhotoSwipe modülü dinamik import edilir.
- `src/components/products/ProductCard.jsx`, galeri ölçülerini başlangıçta `1×1` olarak yazar ve görselin `onLoad` olayında gerçek ölçülerle günceller. Prerendering sonrasında görsel hydration öncesinde yüklenebileceği için bu davranış ayrıca ele alınmalıdır.
- `src/components/layout/Header.jsx` içindeki mobil menü React state kullanır. Etkileşimlerin korunması hydration gerektirir.
- Build komutu `vite build && node scripts/create-github-pages-404.mjs` şeklindedir. Script, ana sayfayı `dist/404.html` olarak kopyalar.
- `.github/workflows/deploy.yml`, Node 22 ve pnpm 10 kullanır; frozen lockfile ile kurulumdan sonra `pnpm build` çalıştırır ve `dist` klasörünü GitHub Pages'e yükler. Hedef domain `https://sarioglukapi.com` olarak verilmiştir; canlı hosting davranışı analizde test edilmemiştir.

## Mimari karar

Önerilen yaklaşım, Vite'ın SSR derlemesini yalnızca build sırasında kullanarak mevcut TanStack Router sayfalarını prerender etmektir. Sekiz sabit route ve yerel içerik nedeniyle framework değişikliği gerekli görünmemektedir. Yayında Node sunucusu gerekmeyecektir.

Ortak bir router factory, build için render girişi ve küçük bir Node üretim script'i yeterli kapsam olarak hedeflenir. Dosya tabanlı routing, mevcut bileşenler ve istemci etkileşimleri korunur. Üretilen route ağacı elle düzenlenmez. Başlangıçta ek bir prerender framework'ü, tarayıcı tabanlı snapshot bağımlılığı veya Helmet eklenmez.

TanStack Router'ın SSR API'leri güncel belgelerde deneysel olarak işaretlenmektedir. Kullanılacak entegrasyon kurulu sürüme göre doğrulanmalıdır. İlk doğrulama, çözümü kapsamlı özel SSR altyapısına dönüştüren bir engel gösterirse TanStack Start'ın yerleşik statik prerendering yaklaşımı değerlendirilir. Start'a geçiş varsayılan adım değildir.

## Aşamalı uygulama planı

### 1. Ana sayfa ve bir kategoriyle prerendering doğrulaması

- Router oluşturmayı ortak bir factory'ye taşı; istemci ve build render girişi aynı route ağacını ve URL ayarlarını kullansın.
- Build için ayrı render girişi ve küçük bir Node script'i ekle. Her URL için ayrı router oluştur; route ve code splitting ile ayrılan bileşenler yüklenmeden HTML yazma.
- Vite istemci çıktısındaki asset yollarını kullan. SSR derlemesini ayrı geçici çıktı dizininde tut; istemci `dist` çıktısının silinmesini veya üzerine yanlış içerik yazılmasını önle.
- `import.meta.glob`, görsel importları ve CSS importlarının Vite tarafından dönüştürüldüğünü doğrula; JSX kaynaklarını doğrudan sıradan Node importuyla çalıştırmaya dayanma.
- `src/main.jsx` içinde hazır HTML için `hydrateRoot`, boş geliştirme kabuğu için `createRoot` kullan. Router'ın SSR/hydration entegrasyonunu kurulu sürümün desteklediği API'lerle tamamla.
- İlk denemede ana sayfa ve bir kategori gerçek içerikle üretilemiyorsa veya hydration kararlı değilse, tüm sayfalara yaymadan önce nedeni çöz.

### 2. SEO bilgilerini tek kaynaktan yönet

- Route `head` tanımları ve `HeadContent` ile sekiz sayfanın özgün title, description ve canonical değerlerini yönet; seçilen SSR entegrasyonunun gerektirdiği script/hydration bileşenlerini de bağla.
- SEO etiketleri ilk HTML yanıtının `<head>` bölümünde yer alsın; istemci tarafındaki route geçişlerinde güncellensin.
- Canonical adreslerini `https://sarioglukapi.com` kökünden üret. Domain ve URL normalizasyonu için ortak ayar kullan.
- `index.html` içindeki ortak title'ın ikinci kez üretilmesini önle; belge dilini `tr` yap. Favicon ve manifest bağlantılarını koru.
- Route listesi ve SEO kayıtları arasında eksik veya fazladan sayfa oluşmasını build kontrolüyle yakala. Ek Helmet bağımlılığı ekleme.

### 3. Emotion ve PhotoSwipe uyumluluğunu tamamla

- Önce Emotion'ın mevcut SSR desteğini kullan. JavaScript kapalıyken stillerin HTML ile geldiğini, hydration sırasında sınıf/stil uyuşmazlığı veya belirgin stil sıçraması olmadığını doğrula.
- Gereksinim ortaya çıkmadıkça `@emotion/server` ekleme. Stil çıkarma veya özel cache düzeni gerekirse sunucu ve istemci ayarlarının eşleşmesini sağla.
- PhotoSwipe Lightbox modül importunun Node render ortamında güvenli olduğunu doğrula. Gerekirse importu effect içine taşı; başlatma ve temizleme yaşam döngüsünü koru.
- Ürün kartlarında başlangıç galeri ölçülerini doğru veriden üret veya hydration sırasında zaten yüklenmiş görselleri de kapsayan ölçüm uygula. Yalnızca `onLoad` olayına güvenme.
- Mevcut görsel bağlantıları JavaScript olmadan da erişilebilir kalsın; mobil menü ve galeri hydration sonrasında çalışsın.

### 4. Tüm HTML ve SEO dosyalarını üret

- Ana sayfayı `dist/index.html`, diğer sayfaları örneğin `dist/iletisim/index.html` olarak üret.
- Sayfa üretimiyle aynı route listesinden `sitemap.xml` ve sitemap adresini içeren `robots.txt` oluştur. Sitemap'e yalnızca yayımlanan canonical sayfaları ekle; 404 sayfasını ekleme.
- GitHub Pages'in dizin URL davranışını doğrulayarak trailing-slash politikasını router, iç bağlantılar, canonical ve sitemap için ortaklaştır. Mevcut slash'siz URL'lerin erişilebilirliğini kontrol et.
- Ana sayfanın kopyası olan SPA fallback'i yerine gerçek bulunamadı içeriği ve `noindex` içeren `404.html` üret. İstemci tarafında bilinmeyen route'lar için de bulunamadı görünümü ekle.
- Eksik sayfa, render hatası veya çözümlenmemiş içerik varsa build başarısız olsun; eksik çıktı deployment'a ilerlemesin.

### 5. Deployment zincirini ve doğrulamayı tamamla

- `package.json` build zincirini istemci derlemesi, build amaçlı SSR derlemesi, prerendering ve SEO dosyası üretimini kapsayacak şekilde güncelle.
- `.github/workflows/deploy.yml` içindeki `pnpm build → dist` sözleşmesini koru. Yayına yalnızca tamamlanmış statik çıktıyı gönder; geçici SSR derlemesini artifact'e dahil etme.
- Mevcut domain ve GitHub Pages ayarlarını koru. Uygulama tamamlandıktan sonra aşağıdaki kontrolleri çalıştır.

## Test ve kabul kriterleri

### Build ve çıktı

- Projenin lint kontrolü ve yeni build zinciri başarıyla tamamlanır.
- Sekiz sayfanın HTML dosyası üretilir; her dosyada ilgili başlık, metinler, bağlantılar ve kategori sayfalarında ürün içerikleri bulunur. Boş uygulama kabuğu veya Suspense yükleme görünümü nihai içerik yerine kaydedilmez.
- Görsel, CSS ve JavaScript yolları doğru istemci build çıktısına işaret eder; eksik asset bulunmaz.
- Route listesi, SEO kayıtları, üretilen sayfalar ve sitemap birbiriyle eşleşir.

### SEO ve JavaScript olmadan erişim

- Her HTML dosyasının kaynak kodunda sayfaya uygun tek title, meta description ve canonical bulunur; belge dili `tr` olur.
- JavaScript kapalıyken içerik, ürün görselleri ve temel bağlantılar erişilebilir, stil uygulanmış durumdadır.
- İstemci route geçişlerinde SEO etiketleri doğru güncellenir; önceki sayfanın canonical veya description değeri kalmaz.
- `sitemap.xml` geçerli XML'dir ve sekiz canonical sayfayı içerir; `robots.txt` sitemap'in mutlak URL'sini bildirir.

### Hydration, tasarım ve etkileşimler

- Tarayıcı konsolunda hydration uyuşmazlığı veya render hatası bulunmaz.
- Masaüstü ve mobil görünüm mevcut tasarımla karşılaştırılır; Emotion stilleri hydration sırasında bozulmaz.
- Mobil menü, PhotoSwipe açma/kapatma, görseller arası geçiş ve yakınlaştırma çalışır. Önceden yüklenmiş/önbellekteki görsellerin galeri ölçüleri de doğru olur.
- İç bağlantılar, geri/ileri gezinme, doğrudan URL açma ve sayfa yenileme çalışır.

### Hosting

- Önce SPA fallback uygulamayan statik sunumla doğrudan sayfa erişimi kontrol edilir; yalnızca geliştirme sunucusunun fallback davranışına güvenilmez.
- GitHub Pages üzerinde geçerli sayfalar son yanıt olarak HTTP 200, bilinmeyen adresler HTTP 404 döndürür.
- Slash'li ve mevcut slash'siz adresler kontrol edilir; yönlendirme davranışı canonical politikasıyla tutarlıdır.
- Domain, HTTPS, asset'ler, sitemap ve robots.txt yayımlanan ortamda erişilebilirdir.

## Teknik kaynaklar

- [Vite SSR ve önceden render etme](https://vite.dev/guide/ssr.html)
- [TanStack Router SSR](https://tanstack.com/router/latest/docs/guide/ssr)
- [TanStack Router head yönetimi](https://tanstack.com/router/latest/docs/guide/document-head-management)
- [Emotion SSR](https://emotion.sh/docs/ssr)
- [TanStack Start statik prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)

Güncel dokümantasyon uygulama yaklaşımını destekler; projedeki kesin sürüm uyumluluğu ilk uygulama aşamasında ayrıca doğrulanacaktır.

## Uygulama durumu — 16 Ekim 2026

Yukarıdaki analiz ve plan ilk değerlendirmeyi kaydeder. Bu bölüm, uygulama sırasında elde edilen sonuçları belirtir.

### Tamamlanan değişiklikler

- Vite + TanStack Router korundu; framework değişikliği ve yeni paket bağımlılığı gerekmedi.
- `src/router.jsx` ortak router factory'sini, `src/entry-server.jsx` build amaçlı render girişini sağlar. Kurulu Router sürümündeki `createRequestHandler`, `RouterServer`, `renderRouterToString` ve `RouterClient` entegrasyonu doğrulandı.
- Kök route, `HeadContent` ve `Scripts` içeren belge shell'ini yönetir. İstemci hazır belgeyi `hydrateRoot(document, ...)` ile hydrate eder; geliştirme modunda boş belge `createRoot(document)` ile oluşturulur.
- `src/data/seo.js` sayfa SEO kayıtları, domain ve canonical üretimi için ortak kaynak oldu. Sekiz route kendi `head` tanımını kullanır. Belge dili `tr` olarak ayarlandı; canonical adresler ve router bağlantıları trailing slash kullanır.
- `scripts/prerender.mjs`, Vite istemci manifestinden giriş script'ini ve bölünmüş bileşenlerin CSS dosyalarını alır. Mevcut tek PhotoSwipe CSS çıktısı tüm sayfalara bağlanır; bu küçük stylesheet için ek route/manifest eşleme altyapısı kurulmadı.
- Build, istemci çıktısını `dist/`, SSR modüllerini ayrı `dist-ssr/` dizininde üretir. Sekiz sayfa, sitemap.xml, robots.txt ve gerçek `noindex` 404.html dosyası `dist/` altında oluşturulur.
- Ana sayfayı 404.html olarak kopyalayan eski script kaldırıldı. SSR sırasında trailing-slash yönlendirmesini tetiklememek için bulunamadı görünümü `/404/` isteğiyle render edilip `404.html` olarak yazılır.
- PhotoSwipe'ın mevcut modül importu Node render ortamında çalıştı; dinamik importa taşıma gerekmedi. Effect, hydration öncesinde yüklenmiş görsellerin ölçülerini günceller; galeri verisi oluşturulurken doğal görsel ölçüleri yeniden kontrol edilir. Görsellerin gerçek boyutları farklı olduğundan ortak varsayımsal ölçü kullanılmadı.
- Footer yılı Vite tarafından build sırasında sabitlenir; daha sonraki bir yılda ziyaret edilmesi hydration uyuşmazlığı oluşturmaz. Yıl güncellemesi yeni build gerektirir.
- GitHub Actions workflow'unda değişiklik gerekmedi: mevcut `pnpm build → dist` sözleşmesi korunur. README yeni build ve SEO bakım akışını açıklar.

### Gerçekleştirilen doğrulamalar

- Önce ana sayfa ve bir kategori gerçek HTML ve Emotion stilleriyle üretildi; hydration ve galeri açma/kapatma Chromium'da doğrulandı. Ardından üretim sekiz sayfaya genişletildi.
- `pnpm build` başarılıdır. Build içinde route/SEO eşleşmesi, benzersiz title ve description, Türkçe belge dili, sayfa başına tek h1/title/description/canonical, kategori ürün sayıları, 404 yanıtı ve noindex etiketi ile 97 yerel bağlantı/asset hedefi denetlendi.
- `pnpm lint` hata vermeden tamamlandı; dört route modülünde `react/only-export-components` Fast Refresh uyarısı bulunur. Bu uyarılar production build'i engellemez. `git diff --check` de başarılıdır.
- Ortamda mevcut Chromium otomasyon aracıyla, proje bağımlılığı eklenmeden yerel tarayıcı kabul kontrolleri çalıştırıldı. Sunucu mevcut dizin HTML'lerini ve özel 404 dosyasını sundu; SPA fallback kullanılmadı.
- Sekiz sayfa JavaScript kapalıyken başlık, içerik, ürün bağlantıları ve SEO etiketleriyle açıldı. H1 kutu yükseklikleri JavaScript açık görünümle karşılaştırıldı ve eşleşti.
- Sekiz sayfanın hydration kontrolünde konsol veya render hatası görülmedi. Script'lerin çalışmasıyla sayfa başına tek SEO etiketi korunur.
- Önbellekteki görsellerle galeri ölçüleri, PhotoSwipe açma/kapatma, sonraki görsele geçiş, model açıklaması ve yakınlaştırma doğrulandı.
- İstemci route geçişinin belgeyi yeniden yüklemeden çalıştığı; canonical/title güncellemeleri, geri/ileri gezinme, mobil menü açma/kapatma ve mobil iletişim görünümünde yatay taşma olmadığı doğrulandı.
- Bilinmeyen URL yerel sunucuda HTTP 404 verdi; hydration sonrasında bulunamadı içeriği ve noindex korundu. Ana sayfaya istemci geçişi tamamlanınca noindex kaldırıldı ve doğru canonical geldi.
- Slash'siz `/kurumsal` adresinin yerel statik sunucuda `/kurumsal/` üzerinden HTTP 200 ile açıldığı; sitemap XML'inin sekiz URL içerdiği ve robots.txt'nin sitemap adresini bildirdiği doğrulandı.
- İstemcinin yıl değeri 2030 olarak değiştirilerek footer'ın hydration uyuşmazlığı üretmediği doğrulandı.
- `pnpm dev` ile ana sayfa, kategori ve kurumsal sayfanın doğrudan açılması tarayıcıda kontrol edildi; geliştirme konsolunda hata görülmedi.

### Yayın sonrası bekleyen kontroller

- Henüz deployment yapılmadı. GitHub Pages ve canlı domain üzerindeki HTTPS, slash yönlendirmeleri, nihai HTTP 200/404 yanıtları, sitemap, robots.txt ve asset erişimi yayın sonrasında doğrulanmalıdır.
- `pnpm preview`, Vite'ın SPA fallback davranışını kullanabilir. Canlı 404 davranışının kabulü yalnızca bu komuta dayanılarak yapılmamalıdır.
- TanStack Router'ın deneysel SSR API'leri nedeniyle gelecekteki paket güncellemelerinde build ve hydration kontrolleri yeniden çalıştırılmalıdır.
