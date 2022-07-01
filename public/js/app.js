import * as Vue from "./vue.js";
// Import my first component.
import bigCard from "./big-card.js";

// All vue code comes here
const MAX_CARD = 6;

Vue.createApp({
    data() {
        return {
            name: "Cayenne",
            cards: [],
            idCard: false,
        };
    }, //Data ends here

    //Register here the component and where to find the info.
    components: {
        "big-card": bigCard,
    },

    mounted() {
        // This will be automatic display when the app is shows.
        console.log("I will run the first time the up is uploaded!");

        fetch("/board")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Response form /board:", data);
                this.cards = data;
            });
    },

    methods: {
        //this is where we define all of OUR functions

        handleSubmit(e) {
            // We can put it here or in the html
            e.preventDefault();
            console.log("I am handling the submit");
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        // manage the error
                    }

                    console.log("I finish uploading. Lets try to show");
                    // I am updating my array
                    this.cards.unshift(data.image);

                    this.$refs.file.value = null;

                    // Controlling how many image to show
                    if (this.cards.length > MAX_CARD) {
                        this.cards.pop();
                    }

                    console.log(data.image);
                    console.log("this.cards.length", this.cards.length);
                })
                .catch();
        },

        displaycard(id) {
            console.log("I am clicking in card:", id);
            this.idCard = id;
        },

        hidecard() {
            this.idCard = false;
        },
    },
}).mount("#main");
