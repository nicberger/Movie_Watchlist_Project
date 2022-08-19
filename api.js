//TMDB 

const API_KEY = "api_key=81a50cc70061c7a1a7e9bf42ab72a25d";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// getmovies(API_URL)

// function getmovies(url){
//     fetch(url).then(res=>res.json).then(data => {
//         console.log(data)
//     }
//         )
// }


app.get('/', (req, res)=>{
    res.render('auth/search');
})


app.get('auth/result', (req, res)=>{
   
    let query = req.query.search;

    request("https://api.themoviedb.org/3/search/movie?api_key={API_KEY}d&query="+query, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data: data, querySearch: query});
        }  
    })
})