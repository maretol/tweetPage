# tweet this page

ブラウザのトラッカーを拒否するとTweetボタンが表示されないので同じ機能の拡張機能を作っちゃおうというもの

ツイートするほか get parameter を取り去ったり amazon ならURLを必要最低限のものにしたりできるようにしたい

# build

Webpackでビルドする。コマンドは `$ npm run build` で通る

# パラメータ

Twitter は

```
https://twitter.com/intent/tweet?text={encoded text}&url={encoded url}
```

でツイートできる仕組みがあるのでそれを使う。よってOAuthとかToken保管みたいな面倒なやつは実装しない

## Nostter

Nosterクライアントの一つであるNostterにも対応した


```
https://nostter.app/post?content={url-encoded-text-here}
```

これにそのまま対応する。とりあえず nostter ブランチで対応

# その他

- URLのGetパラメータを排除する（長くなるので）
    - ただしYoutubeのビデオIDは付与するようにしている
- Amazonの商品ページはURLを一部置換して最短のURLになるようにしている

