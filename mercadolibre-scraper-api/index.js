const express = require("express")
const cheerio  = require("cheerio")
const axios = require("axios")
const app = express()
const PORT = process.env.PORT || 8000


// app.use(express.json)

app.get("/", (req, res) => {
    res.json("Bienvenido a la API scraper de Mercadolibre")
})

app.get("/productos/:idProducto", async (req,res) => {
    const product = req.params.idProducto

   axios.get(`https://www.mercadolibre.com.ar/p/${product}`)
        .then(response => {
            const page = response.data
            const $ = cheerio.load(page)
            const targetElement = $("#ui-pdp-main-container")
            const contents = {}

            const name = $('div > h1', targetElement).text()
            contents.name = name

            const price = $('div > span > span:first', targetElement).text()
            contents.price = price
            
            const details = $('ul:first', targetElement).text()
            contents.details = details.replace(/\./g, ". ")

            const rating = $(".ui-review-capability__rating__average").text()
            contents.rating = rating
            const ratingCount = $(".ui-review-capability__rating__label").text()
            contents.ratingCount = ratingCount
            
            contents.url = `https://www.mercadolibre.com.ar/p/${product}`
           
            res.json(contents)
        })
        .catch(err => console.log(err))

})

app.get("/ofertas", async (req,res) => {

   axios.get(`https://www.mercadolibre.com.ar/ofertas`)
        .then(response => {
            const page = response.data
            const $ = cheerio.load(page)
            const targetElement = $("ol.items_container")
            const contents = []

            $("a", targetElement).each((i,elem) => {
                const description  = $("p",elem).text()
                // const price = $(".andes-money-amount-combo__main-container span  ",elem).filter((i,e) => $(e).text().includes("$")).text()
                const price = $('.andes-money-amount-combo__main-container span:contains("$")').text()
                const url = $(elem).attr("href");
                let id = url.match(/\/p\/(.*?)\?/);
                id = id ? id[1] : null
                contents.push({description, price, url, id})
            })

            res.json(contents)
        })
        .catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`Server running on ${PORT}`))