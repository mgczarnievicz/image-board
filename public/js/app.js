import * as Vue from "./vue.js";
// All vue code comes here
const MAX_CARD = 6;

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

        handleSubmit(e) {
            // We can put it here or in the html
            e.preventDefault();
            console.log("I am handleling the submit");
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((res) => res.json())
                .then((data) => {
                    // data shoul be the image just ablodede
                    if (data.error) {
                        // manage the error
                    }

                    console.log("I finish uploading. Lets try to show");
                    this.cards.unshift(data.image);

                    if (this.cards.length > MAX_CARD) {
                        this.cards.pop();
                    }

                    console.log(data.image);
                    console.log("this.cards.length", this.cards.length);
                })
                .catch();
        },
    },
}).mount("#main");
