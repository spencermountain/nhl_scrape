# nhl_scrape
turn nhl.com schedule data into json

just give it the year (like `20152016`) you want to scrape

```
npm install nhl_scrape
npm install
node index.js 20152016 > result.json
```

a digest of the format:
```javascript
[
  { date: 'Sat Apr 11, 2015',
    time: '10:00 PM ET',
    home_team: 'Vancouver',
    away_team: 'Edmonton',
    score: { Edmonton: 5, Vancouver: 6 },
    links:
     { recap: 'http://www.nhl.com/gamecenter/en/recap?id=2014021230',
       video: 'http://video.nhl.com/videocenter/console?hlg=20142015,2,1230&lang=en',
       photos: 'http://www.nhl.com/ice/gallerylanding.htm?id=53958' },
    winner: 'Vancouver',
    loser: 'Edmonton'
    }
  ]
  ```
don't sue me

MIT