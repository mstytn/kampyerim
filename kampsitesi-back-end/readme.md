# Kampyerim Web Uygulaması Back-End

[Kampyerim Okubeni](../readme.md) > Back-End Okubemi | [Front-End Okubeni](../kampsitesi-front-end/readme.md)

Bu back-end projesi İsmek Frnot-End developer bitirme projesi için back-end bilgilerini sağlaması için opsiyonel olarak geliştilidi.

JSON REST API mantığı ile çalışmaktadır. Gelen HTTP istekleri karşısında JSON veri objeleri gönderen back end aplikasyonudur.

Front-End için bir veri tabanı sunmaktan öte, accuweater, mapbox gibi authentication isteyen API'lar için ara geçiş uygulaması olarak geliştirildi. İstekler back-end aplikasyonu içinde yapılıp istenilen sonuç yalıtılıp sadece gerekli olan biligiler JSON cevabına eklenip Front-End ugulamasına gönderilir.

## İndeks

- [Kullanılan Paketler](#kullanılan-paketler)
  - [mongoose](#mongoose)
  - [axios](#axios)
  - [cors](#cors)
  - [dotenv](#dotenv)
  - [morgan](#morgan)
  - [@mapbox/mapbox-sdk](#mapboxmapbox-sdk)
  - [@types/node](#typesnode)
  - [express](#express)
- [Mini Doküman](#mini-doküman)
  - [GET ROUTES](#get-routes)
  - [POST ROUTES](#post-routes)
- [CampResponse Örneği](#campresponse-örneği)
  - [Olumlu Örnek](#olumlu-dönüş-örneği)
  - [Olumsuz Örnek](#olumsuz-cevap-örneği)
- [Accuweather API Hakkında Not](#accuweather-api-hakkında-not)

## Kullanılan Paketler

- [x] [express](https://www.npmjs.com/package/express)
- [x] [mongoose](https://www.npmjs.com/package/mongoose)
- [x] [axios](https://www.npmjs.com/package/axios)
- [x] [cors](https://www.npmjs.com/package/cors)
- [x] [dotenv](https://www.npmjs.com/package/dotenv)
- [x] [morgan](https://www.npmjs.com/package/morgan)
- [x] [@mapbox/mapbox-sdk](https://www.npmjs.com/package/@mapbox/mapbox-sdk)
- [x] [@types/node](https://www.npmjs.com/package/@types/node)-- Dev Dependency

### mongoose

MongoDB veri tabanı ile ilişku karan pakettir. Veri tabanı CRUD işlemlerini kolaylaştırmak için geliştirilmiş npm paketidir.

### axios

Üçüncü taraf uygulamalardan *(accuweather, mapbox... gibi)* veri almak için CRUD işlemleri yapan XHTTPRequest warper kütüphanesi.

### cors

Back-End'in Cross-Origin istekleri karşılamasını sağlamak için Corss-Origin Tanımlamalarını yapan npm paketi.

### dotenv

Geliştirme aşamasında, Environment Variables belirlemek için kullanılan npm paketi. Git-Hub'da hariç tutulmuştur.

### morgan

Gelen HTTP istekleri konsola raporlamak için kullanıdığım npm paketi.

### @mapbox/mapbox-sdk

Geolocation/Reverse geolocation ve iki nokta arasındaki trafiksiz yol uzaklıklarını hesaplayan mapbox adlı web servisinin API bağlantısını yapan npm paketi. Mapbox sitasinin kendi geliştirdiği npm paketi.

### @types/node

Node için typescript type kütüphanesi. Node ile kod yazarken otomatik tamamlamaların çalışması için geliştirme zamanı için npm paketi.

### express

Back-end'in RESTFUL API server paketi.

## Mini Doküman

Root Route kullanılmamaktadır.

### GET ROUTES

```http
https://{host}/provinances
```

Kampların bulunduğu Bölgeleri JSON Array olarak dödüren route.

```http
https://{host}/camps/{provinance}
```

Belli bir bölgedeki kampların tüm listesini veren route.
İstekler bu şekilde belirsiz tutulmuştur. Çünkü belirli bir front-end'e sunuculuk yapması için tasarlandığından istek paramereleri ne olduğu belli olmayan şekilde geliştritildi.

```http
https://{host}/camps/camp/{kampId}
```

İstek prarametresi olarak verilen kampın id'si ile kamp bilgilerini gönderen route. Geri dönen standart CampResponse sınıfının JSON replikası

### POST ROUTES

```http
https://{host}/camps/filter
```

Kapmları Bölge / İl / İlçe olarak filtreleyip geri gönderen POST Route.
İstek Başlığı: ``'Content-Type', 'application/json`` içermeli. Örnek istek body'nin içeriği ise:

```json
{
  "provinance": "Bölge",
  "place": "ilçe",
  "region": "il"
}
```

## CampResponse Örneği

### Olumlu dönüş örneği

```json
"CampResponse": {
  "sucess": true,
  "length": 1,
  "data": [
    {
      ...
    }
  ]
}
```

### Olumsuz cevap örneği

```json
"CampResponse": {
  "sucess": false,
  "length": 0,
  "data": {}
}
```

#### Accuweather API hakkında not

Accuweater resmi bir npm paketi sunmadığından istekler axios kullanarak yapılıyor.

Accweather ücretsiz API kulandığımdan istek sınırım bulunuyor. Bu sınırı bir derece azaltmak için Accuweater'dan yapılan istekler 5 saat boyunca sitede tutuluyor. Her kamp bölgesi için yapılan bir istek 5 saatten önce tekrar havadurumu bilgisi isteği yapmıyor. Bu yüzden havadurumu bilgileri her zaman güncel olmayabilir. Prodüksiyon aşamasında bu işlev iptal edilebilir.
