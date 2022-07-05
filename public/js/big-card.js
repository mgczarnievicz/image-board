import commentsModal from "./comments-modal.js";

const bigCard = {
    data() {
        return {
            card: {},
            next: false,
            previous: false,
        };
    },
    props: ["cardId"],

    components: {
        "comments-modal": commentsModal,
    },

    watch: {
        cardId: function () {
            console.log("CardId was update!!!! I am listen to u!", this.cardId);
            fetch(`/getCard/${this.cardId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("data in big img mounted", data);
                    data.img ? (this.card = data.img) : this.$emit("close");

                    this.next = false || this.card.nextId;
                    this.previous = false || this.card.previousId;
                    console.log(
                        `this.next ${this.next}, this.previous: ${this.previous}`
                    );
                })
                .catch(() => console.log("Error in /getCard"));
        },
    },

    mounted() {
        console.log("cardId in Big-Card", this.cardId);

        fetch(`/getCard/${this.cardId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data in big img mounted", data);
                data.img ? (this.card = data.img) : this.$emit("close");

                this.next = false || this.card.nextId;
                this.previous = false || this.card.previousId;
                console.log(
                    `this.next ${this.next}, this.previous: ${this.previous}`
                );
            })
            .catch(() => console.log("Error in /getCard"));
    },

    methods: {
        closeBigCard() {
            // Telling the parent to close the big card
            this.$emit("close");
        },

        /* 
        nextId: 4
        previousId: 1
        */
        nextCard() {
            // console.log("this.data", this.card);
            console.log("Next Image:", this.card.nextId);
            this.$emit("update", this.card.nextId);
        },

        previousCard() {
            console.log("Previous Image:", this.card.previousId);
            this.$emit("update", this.card.previousId);
        },
    },
    //  new Date({{card.created_at}}) <font-awesome-icon icon="fa-solid fa-xmark" />
    template: `<div class="popup-card card">
                    <i class="fa-solid fa-xmark close-icon" @click="closeBigCard"></i>
                

                    <div class="popup-content">   

                        <div v-if="previous" class="arrow"  @click="previousCard">
                            <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        </div>

                        <div class="big-card card">
                            <img v-bind:src="card.url" :alt="card.title" v-bind:key="card.id" class="big-img">
                            <div class="card-info"> 
                                <h1>{{card.title}}</h1>
                                <p class= "image-description"> {{card.description}} </p> 
                                <p class="image-info">Uploaded by {{card.username}} on {{card.created_at}}</p> 
                            </div>
                        </div>
                        
                        <comments-modal v-bind:card-id-for-comment="cardId" ></comments-modal>
                        
                        <div v-if="next" class="arrow"  @click="nextCard" >
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>

                        
                    </div>

            </div>`,
};

export default bigCard;
