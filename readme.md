# **Kampyerim** *Front-End* Back-End* Web Uygulaması (İsmek Kurs Bitirme Ödevi)

İsmek Front-End Developer kursu için bitirme projesidir. Bu repo **Back-End** ve **Front-End** olmak üzere iki kısımdan oluşmaktadır.

## Site Amacı

Kamp Sitesi Türkiyede bulunan kamp yapılabilecek ücretli ya da ücretsiz kamp lanalarını listelemek, bu alanlardaki günlük ve ileri tarihli havadurumu bilgisi ve bulunulan konumdan (kullanıcı lokasyon izni verdiyse) ya da seçilen konumdan uzaklığını km olarak gösteren bir ugulama olmak üzere tasarlandı. Zamanla eklenebilecek özellikler yapılabiliecekler listesinde belirtilmektedir.

![Site Önizlemesi](./screenshot.png)

## İndex

- [Repo Yapısı](#repo-yapısı)
  - [Front-End](#front-end)
    - [Back-End Okubeni](./kampsitesi-back-end/readme.md)
  - [Back-End](#back-end)
    - [Front-End Okubeni](./kampsitesi-front-end/readme.md)
- [Kaynaklar](kaynaklar)

## Repo Yapısı

### Front-End

Front-End kısmı ise Standart HTML - CSS - JS çalıştıracak şekilde planlandı. Kurs içeriği aslında bu kısımda bulunmaktadır. Back-End kısmı yalnızca Front-End'i desteklemek için yazıldı.

### *Back-End

Back-End kısmı sadece front-end sitenin ihtiyacı olanbilgileri sağlayacak şekilde geliştirildi. MongoDB veri tababı kullanır. Diğer yardımcı API'lardan sağladığı biligiler ile birlikte Front-End içeriğini sağlar.

Veri tabanına yazmayı desteklemez. POST Route veri tabanı ile ilgili bir işlem gerçekleitirmez. Standart HTTP protokılü GET isteği ile body göndermeyi desteklemediği içim, yalnızca veri talep etmek için gerekli kriterleri gönderen Front-End uygulamasından sorguları body içerisinde almak için kulanılır.

Ayrıca API KEY gerektiren sınırlı API lar için aracı gibi iş görmesi için geliştirildi.

[Back-End Readme](./kampsitesi-back-end/readme.md)

## Kaynaklar

Kamp alanı bilgileri [Google Haritalar - Kamp Yerleri - Niyazi Solak](https://www.google.com/maps/d/viewer?mid=1OXYU1CRdfYLRTIYIjsOnakf2xy8&ll=39.83272060521435%2C34.16905716795084&z=8) hazırlamış olduğu herkese açık Google Haritalar'dan alınmıştır.

&copy; Bu proje kesinlikle ticari bir amaç içermez. Kullanılan *görsel* ve *içeriğin* ticari amaçlı kullanımı **telif hakı ihlali** oluşturabilir.

Teşekkürler | Mustafa Yatağan

<sub>Bu Redme <span style="color:limegreen">*21.05.2022*</span> tarihinde hazırlanmıştır, geliştirme sırasında değişecektir.</sub>
