import * as Vue from "./vue.js";
// All vue code comes here

Vue.createApp({
    data() {
        return {
            name: "Cayenne",

            cards: [],
        };
    }, //Data ends here

    mounted() {
        // This will be automatic display when the app is shows.
        console.log("I will run the first time the up is uploaded!");

        fetch("/board")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Respons form /board:", data);
                this.cards = data;
            });
    },

    methods: {
        //this is where we define all of OUR functions
        myFirstFunction: function (city) {
            console.log(" myFirstFunction is running!!");
            console.log("City name pass:", city);
        },
    },
}).mount("#main");
