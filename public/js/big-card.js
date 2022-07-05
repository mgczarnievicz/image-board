import commentsModal from "./comments-modal.js";

const bigCard = {
    data() {
        return {
            card: {},
        };
    },
    props: ["cardId"],

    components: {
        "comments-modal": commentsModal,
    },

    mounted() {
        // aca tengo que leer la base de datos!
        console.log("cardId in Big-Card", this.cardId);

        fetch(`/getCard/${this.cardId}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.card = data;
            })
            .catch(() => console.log("Error in /getCard"));
    },

    methods: {
        closeBigCard() {
            // Telling the parent to close the big card
            this.$emit("close");
        },
    },
    //  new Date({{card.created_at}}) <font-awesome-icon icon="fa-solid fa-xmark" />
    template: `<div class="popup-card card">
                    <i class="fa-solid fa-xmark close-icon" @click="closeBigCard"></i>
                

                    <div class="popup-content">   
                    
                    <div class="big-card card">
                        <img v-bind:src="card.url" :alt="card.title" v-bind:key="card.id" class="big-img">
                        <div class="card-info"> 
                            <h1>{{card.title}}</h1>
                            <p class= "image-description"> {{card.description}} </p> 
                            <p class="image-info">Uploaded by {{card.username}} on {{card.created_at}}</p> 
                        </div>
                    </div>
                       
                    <comments-modal v-bind:card-id-for-comment="cardId" ></comments-modal>
                    
                    
                    </div>

            </div>`,
};

export default bigCard;
