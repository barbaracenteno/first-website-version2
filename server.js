const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const viagens = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = { 
        avatar_url:'https://scontent.ffln2-2.fna.fbcdn.net/v/t1.0-9/s960x960/73532989_2499548260100251_6387418050567602176_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_eui2=AeH0ETnu9NsS3YMopScKnfHuGbhlqDsAdiMZuGWoOwB2I4eJt1bjImOqGKqY5zggJ-VXLzXhuUftlw5nz7JWH8IR&_nc_ohc=iulX5YUbBZQAX_N96eB&_nc_oc=AQmueAoag4_5-SQrh8zwtzh_A-Una-DaohfnHTkQVyR8yV0E8Ms1HKFry8zHIlQTQwA&_nc_ht=scontent.ffln2-2.fna&_nc_tp=7&oh=93cb21a431c67e70b00f20326733c69f&oe=5F49931E',
        name:"Bárbara Centeno",
        role:"Developer Student",
        description:'Futura desenvolvedora de Software.</br>Casada com o mestre-mago da programação: <a href="https://www.linkedin.com/in/tairone-livinalli-386752162/" target="_blank"> Tairone Livinalli </a>',
        links: [
            { name:"Facebook", url:"https://www.facebook.com/babi.centeno/"},
            { name:"Instagram", url:"https://www.instagram.com/barbaracenteno/"},
            { name:"Linkedin", url:"https://www.linkedin.com/in/b%C3%A1rbara-centeno-livinalli-0415631a6/"}
        ]
    };
    return res.render("about", { about })
})

server.get("/classes", function(req, res) {
    return res.render("classes", { items: viagens })
})

server.get("/videos", function(req, res){
    const id = req.query.id

    const video = viagens.find(function(video) {
        return video.id == id;
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("videos", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})