require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function searchByName(searchTerm) {
    knexInstance.from('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

// searchByName('masc')

function paginate(pageNumber) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber - 1)

    knexInstance.from('shopping_list')
    .select('*')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}

// paginate(2)

function itemsAfterDate(daysAgo) {
    knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added',
    '>',
    knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
        console.log(result)
    })
}

// itemsAfterDate(3)

function getTotalCost() {
    knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price AS totalPrice')
    .groupBy('category')
    .then(result => {
        console.log(result)
    })
}

getTotalCost()