import { createServer, Model } from "miragejs"


createServer({
    models: {
        listings: Model,
    },

    seeds(server) {
        server.create('listing', 
        { 
            id: '1',
            supplierID: '1a',
            title: 'Strawberries',
            price: '3.50',
            unit: 'pint',
            desc: 'Ripe red berries',
            imageURL: 'https://fakeimg.pl/100x80/e02121/4bb0db?text=strawberries',
            type: 'produce', 
            subtype: 'fruit'
        })
        server.create('listing', 
        { 
            id: '2',
            supplierID: '1a',
            title: 'Kiwis',
            price: '3.00',
            unit: 'lb',
            desc: 'Vine-ripened kiwifruit',
            imageURL: 'https://fakeimg.pl/100x80/45c936/524bdb?text=Kiwis',
            type: 'produce', 
            subtype: 'fruit'
        })
        server.create('listing', 
        { 
            id: '3',
            supplierID: '1a',
            title: 'Asparagus',
            price: '2.50',
            unit: 'lb',
            desc: 'Asparagus Asparagus Asparagus Asparagus Asparagus Asparagus Asparagus Asparagus.',
            imageURL: 'https://fakeimg.pl/100x80/b5d6a7/17144d?text=Asparagus',
            type: 'produce', 
            subtype: 'vegetables'
        })
        server.create('listing', 
        { 
            id: '4',
            supplierID: '2b',
            title: 'Tomato plants',
            price: '3.00',
            unit: 'plant',
            desc: '3 week old Beefsteak seedlings',
            imageURL: 'https://fakeimg.pl/100x80/2d730f/e8e40c?text=Tomato+plants',
            type: 'plants', 
            subtype: 'vegetables'
        })
        server.create('listing', 
        { 
            id: '5',
            supplierID: '2b',
            title: 'Blueberry bushes',
            price: '25.00',
            unit: 'bush',
            desc: '1 year old bushes, lots of berries',
            imageURL: 'https://fakeimg.pl/100x80/065cb3/e8e40c?text=Blueberry+bushes',
            type: 'plants', 
            subtype: 'fruit'
        })
        server.create('listing', 
        { 
            id: '6',
            supplierID: '3c',
            title: 'Watermelon Radish seeds',
            price: '4.00',
            unit: 'oz',
            desc: 'Heirloom watermelon radish seeds',
            imageURL: 'https://fakeimg.pl/100x80/e30dd8/0ce89b?text=watermelon+radish+seeds',
            type: 'seeds', 
            subtype: 'vegetables'
        })
        server.create('listing', 
        { 
            id: '7',
            supplierID: '3c',
            title: 'Lemon Cucumber seeds',
            price: '3.50',
            unit: 'oz',
            desc: 'Delicious Lemon Cucumbers',
            imageURL: 'https://fakeimg.pl/100x80/cdebcd/22473a?text=lemon+cucumber+seeds',
            type: 'seeds', 
            subtype: 'vegetables'
        })
    },

    routes() {
        this.namespace = "api"
        this.logging = false

        this.get("/listings", (schema, request) => {
            return schema.listings.all()
        })

        this.get("/listings/:id", (schema, request) => {
            const id = request.params.id
            return schema.listings.find(id)
        })

        this.get("/user/listings", (schema, request) => {
            // Hard-code the userId for now
            return schema.listings.where({ supplierId: "3c" })
        })

        this.get("/user/listings/:id", (schema, request) => {
            // Hard-code the userID for now
            const id = request.params.id
            return schema.listings.findBy({ id, supplierId: "3c" })
        })
    }
})