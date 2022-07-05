import * as Vue from "./vue.js";
// Import my first component.
import bigCard from "./big-card.js";

// All vue code comes here
const AMOUNT_PLUS_CARDS = 3;

Vue.createApp({
    data() {
        return {
            name: "Cayenne",
            cards: [],
            idCard: false,
            onScreenImage: AMOUNT_PLUS_CARDS,
            showMore: true,
        };
    }, //Data ends here

    //Register here the component and where to find the info.
    components: {
        "big-card": bigCard,
    },

    mounted() {
        // This will be automatic display when the app is shows.
        console.log("I will run the first time the up is uploaded!");
        let path = location.pathname.slice(1);
        console.log("path received", path);
        if (path != "") {
            path = Number.parseInt(path);
            console.log("Path after parseInt", path);
            if (Number.isNaN(path)) {
                history.replaceState({}, "", "/");
            } else {
                this.idCard = path;
            }
        }

        window.addEventListener("popstate", () => {
            let path = location.pathname.slice(1);
            console.log("path Event Listener received", path);
            if (path != "") {
                path = Number.parseInt(path);
                console.log("Path Event Listener  after parseInt", path);
                if (Number.isNaN(path)) {
                    history.replaceState({}, "", "/");
                } else {
                    this.idCard = path;
                }
            } else {
                this.idCard = false;
            }
        });
        /* 
        I can se here if i have a number or not.

        */

        fetch("/board")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Response form /board:", data);
                this.cards = data;

                const lastImg = this.cards[this.cards.length - 1];
                lastImg.id === lastImg.lowestId
                    ? (this.showMore = false)
                    : (this.showMore = true);
            });
    },

    methods: {
        //this is where we define all of OUR functions

        handleSubmit(e) {
            // We can put it here or in the html
            e.preventDefault();
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        // manage the error
                    }

                    // I am updating my array
                    this.cards.unshift(data.image);

                    // Clean the input files
                    this.$refs.file.value = null;
                    this.$refs.title.value = null;
                    this.$refs.user.value = null;
                    this.$refs.description.value = null;

                    // Controlling how many image to show
                    if (this.cards.length > this.onScreenImage) {
                        this.cards.pop();
                    }
                })
                .catch();
        },

        displaycard(id) {
            console.log("I am clicking in card:", id);
            this.idCard = id;
            history.pushState({}, "", `/${this.idCard}`);
        },

        hidecard() {
            this.idCard = false;
            history.pushState({}, "", `/`);
        },

        moreImage() {
            let smallestId = this.cards[this.cards.length - 1].id;
            this.onScreenImage += AMOUNT_PLUS_CARDS;
            console.log("smallestId", smallestId);
            console.log("this.onScreenImage", this.onScreenImage);
            // better to do a fetch requets.

            fetch(`/moreImage/${smallestId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.error) {
                        // manage the error
                    }

                    // I am updating my array
                    this.cards.push(...data);
                    // this.cards.flat();

                    const lastImg = this.cards[this.cards.length - 1];
                    lastImg.id === lastImg.lowestId
                        ? (this.showMore = false)
                        : (this.showMore = true);

                    console.log("after displaying more this.cards", this.cards);
                    console.log("this.cards.length", this.cards.length);
                })
                .catch(() => console.log("Error in /getCard"));
        },

        update(newId) {
            console.log("I am in Updating:", newId);
            this.idCard = newId;
            history.pushState({}, "", `/${this.idCard}`);

            // new function for update image
        },
    },
}).mount("#main");
