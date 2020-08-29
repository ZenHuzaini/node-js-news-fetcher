# Node News fetcher

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/ZenHuzaini/node-js-news-fetcher/)

Node news fetcher is a simple web service aiming to get article and books information from New York Times.  created using Node.js.

# Features
Main Features:
-	Can search, sort (Newest & Oldest) article based on character (https://developer.nytimes.com/docs/articlesearch-product/1/overview) (https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=yourkey)
-	Can see detail article
-	Can search books based on list (e-book-fiction and hardcover-fiction) (https://developer.nytimes.com/docs/books-product/1/overview

  
You can also:
  - Save your favorite article and give a note for this favorite article
  - Update your existing favorite article
  - Remove your favorited article
  - See your favorite articles



### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run watch //for development
```

For production environments...
- we need to create .env file with the following keywords

```sh
MONGO_CONNECTION=
NYT_KEY=
NYT_SECRET=
```
- NYT_KEY and NYT_SECRET can be retrieved by registering  to this link https://developer.nytimes.com/docs/articlesearch-product/1/overview

#### Tests
Integration test
```sh
$ npm run integration-test
```
Unit test
```sh
$ npm run test
```

### APIs
| API | DETAILS |
| ------ | ------ |
| GET api/article | to return article based on the search query and sort.|
- example request:
```sh
   {
   "searchQuery": "harry",
   "sort": "oldest"
   }
```

- example response :
```sh
{
   "status": "Operation has been successfully performed",
   "data": [
   {
   "abstract": "A winterish aspect has been put on by the weather in Pennsylvania. At Harrisburg, ?? and ice were formed in the early part of the week. The nights are cool enough everywhere in the North for outside woollens. Steamboat building is carried on to a creditable extent at Pittsburgh. ",
   "web_url": "https://www.nytimes.com/1851/09/19/archives/news-by-the-mails.html",
   "snippet": "",
   "lead_paragraph": "",
   "print_page": "2",
   "source": "The New York Times",
   "multimedia": [],
   "headline": {
   "main": "NEWS BY THE MAILS.",
   "kicker": "1",
   "content_kicker": null,
   "print_headline": "NEWS BY THE MAILS.",
   "name": null,
   "seo": null,
   "sub": null
   },
   "keywords": [],
   "pub_date": "1851-09-19T05:00:00+0000",
   "document_type": "article",
   "news_desk": "None",
   "section_name": "Archives",
   "byline": {
   "original": null,
   "person": [],
   "organization": null
   },
   "type_of_material": "Archives",
   "\_id": "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47",
   "word_count": 0,
   "uri": "nyt://article/63ccf00f-33d8-5dd8-b9e6-18fd25913c47"
   },....]
   }
```

---
| API | DETAILS |
| ------ | ------ |
| GET api/article/idBased | to return article based on the known id of the article or news. |
- example request:
```sh
   {
   "idArticle": "nyt://article/1f955524-feff-57f7-b515-6e65fb5f7425"
   }
```

- example response :
```sh
{
   {
   "status": "Operation has been successfully performed",
   "data": [
   {
   "abstract": "Scientists at Warsaw's zoo have been taking blood, saliva and other samples from the zoo's three elephants in recent days to prepare to test whether giving them hemp oil can reduce their stress.",
   "web_url": "https://www.nytimes.com/aponline/2020/08/28/world/europe/ap-eu-poland-elephants-hemp-oil.html",
   "snippet": "Scientists at Warsaw's zoo have been taking blood, saliva and other samples from the zoo's three elephants in recent days to prepare to test whether giving them hemp oil can reduce their stress.",
   "lead_paragraph": "WARSAW, Poland — Scientists at Warsaw's zoo have been taking blood, saliva and other samples from the zoo's three elephants in recent days to prepare to test whether giving them hemp oil can reduce their stress.",
   "source": "AP",
   "multimedia": [],
   "headline": {
   "main": "Warsaw Zoo Tests Effect of Hemp Oil on Elephants' Stress",
   "kicker": null,
   "content_kicker": null,
   "print_headline": "Warsaw Zoo Tests Effect of Hemp Oil on Elephants' Stress",
   "name": null,
   "seo": null,
   "sub": null
   },
   "keywords": [],
   "pub_date": "2020-08-28T17:27:42+0000",
   "document_type": "article",
   "news_desk": "None",
   "section_name": "World",
   "subsection_name": "Europe",
   "byline": {
   "original": "By The Associated Press",
   "person": [],
   "organization": "The Associated Press"
   },
   "type_of_material": "News",
   "\_id": "nyt://article/1f955524-feff-57f7-b515-6e65fb5f7425",
   "word_count": 559,
   "uri": "nyt://article/1f955524-feff-57f7-b515-6e65fb5f7425"
   }
   ]
   }
```
---
| API | DETAILS |
| ------ | ------ |
| GET api/books | to return all books based on the types |
- example request:
```sh
   {
   "type": "hardcover-fiction"
   }
```

- example response :
```sh
{
   "status": "Operation has been successfully performed",
   "data": [
   {
   "list_name": "Hardcover Fiction",
   "display_name": "Hardcover Fiction",
   "bestsellers_date": "2020-08-22",
   "published_date": "2020-09-06",
   "rank": 1,
   "rank_last_week": 1,
   "weeks_on_list": 103,
   "asterisk": 0,
   "dagger": 0,
   "amazon_product_url": "https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20",
   "isbns": [
   {
   "isbn10": "0735219095",
   "isbn13": "9780735219090"
   },
   {
   "isbn10": "0735219117",
   "isbn13": "9780735219113"
   },
   {
   "isbn10": "0525640371",
   "isbn13": "9780525640370"
   },
   {
   "isbn10": "0593105419",
   "isbn13": "9780593105412"
   },
   {
   "isbn10": "0593187989",
   "isbn13": "9780593187982"
   },
   {
   "isbn10": "0525640363",
   "isbn13": "9780525640363"
   }
   ],
   "book_details": [
   {
   "title": "WHERE THE CRAWDADS SING",
   "description": "In a quiet town on the North Carolina coast in 1969, a young woman who survived alone in the marsh becomes a murder suspect.",
   "contributor": "by Delia Owens",
   "author": "Delia Owens",
   "contributor_note": "",
   "price": 0,
   "age_group": "",
   "publisher": "Putnam",
   "primary_isbn13": "9780735219090",
   "primary_isbn10": "0735219095"
   }
   ],
   "reviews": [
   {
   "book_review_link": "",
   "first_chapter_link": "",
   "sunday_review_link": "",
   "article_chapter_link": ""
   }
   ]
   },..]}
```

---
| API | DETAILS |
| ------ | ------ |
| GET api/book | to return the book based on the type and query search |
- example request:
```sh
   {
   "type": "hardcover-fiction",
   "searchQuery": "town"
   }
```

- example response :
```sh
{
   "status": "Operation has been successfully performed",
   "data": [
   [
   {
   "title": "WHERE THE CRAWDADS SING",
   "description": "In a quiet town on the North Carolina coast in 1969, a young woman who survived alone in the marsh becomes a murder suspect.",
   "contributor": "by Delia Owens",
   "author": "Delia Owens",
   "contributor_note": "",
   "price": 0,
   "age_group": "",
   "publisher": "Putnam",
   "primary_isbn13": "9780735219090",
   "primary_isbn10": "0735219095"
   }
   ]
   ]
   }
```


### CRUD APIs
these endpoints created aiming to extend the functionality of this backend service. I assume that a user, could save their own favorite article and add some comments for it. CRUD is implemented. This BE service for daabase utilizes MongoDB Atlas
| API | DETAILS |
| ------ | ------ |
| GET api/favoriteArticle | to return the favorite article |
- example request:
```sh
   -no params or body required
```

- example response :
```sh
{
   "status": "Operation has been successfully performed",
   "data": [
   {
   "_id": "5f4a27e312d8d7363817ec3a",
   "idArticle": "nyt://article/80b8ed35-d195-591e-82e8-64840bc751b6",
   "note": "tuxxa",
   "createdAt": "2020-08-29T10:03:15.440Z",
   "updatedAt": "2020-08-29T10:03:15.440Z",
   "__v": 0
   }
   ]}
```
---
| API | DETAILS |
| ------ | ------ |
| POST api/favoriteArticle | save the favorite article |
- example request:
```sh
   {
      "idArticle": "nyt://article/80b8ed35-d195-591e-82e8-64840bc751b6",
      "note":"abcd test"
      }
```

- example response :
```sh
{
   "status": "Operation has been successfully performed",
   "data": {
   "\_id": "5f4a27e312d8d7363817ec3a",
   "idArticle": "nyt://article/80b8ed35-d195-591e-82e8-64840bc751b6",
   "note": "abcd test",
   "createdAt": "2020-08-29T10:03:15.440Z",
   "updatedAt": "2020-08-29T10:03:15.440Z",
   "\_\_v": 0
   }
   }
```
---
| API | DETAILS |
| ------ | ------ |
| PUT api/favoriteArticle | update the favorite article |
- example request:
```sh
    {
   "\_id": "5f4a1ca2611e0c1bc42a80da",
   "idArticle": "nyt://article/80b8ed35-d195-591e-82e8-64840bc751b6",
   "note":"new note for this"
   }
```

- example response :
```sh
{
   "status": "Operation has been successfully performed"
  }
```

---
| API | DETAILS |
| ------ | ------ |
| DELETE api/favoriteArticle/:id | delete the favorite article |
- example request:
```sh
    id of the favorite document must be passed in the parameter. E.g: api/favoriteArticle/1234et63789 .
```

- example response :
```sh
{
   "status": "Operation has been successfully performed"
  }
```

#### Deployment
This sevice has been deployed to heroku
```sh
https://nodejs-news-fetcher.herokuapp.com/
```
feel free to use it




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
