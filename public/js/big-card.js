const bigCard = {
    data() {
        return {
            card: {},
        };
    },
    props: ["idCard"],

    mounted() {
        // aca tengo que leer la base de datos!
        console.log("First component mounted");
        console.log("this.idCard", this.idCard);

        fetch(`/getCard/${this.idCard}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Response form /getCard:", data);
                this.card = data;
                console.log("this.cards", this.card);
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
                
                    <div class="big-card card">
                        <img v-bind:src="card.url" :alt="card.title" v-bind:key="card.id" class="big-img">
                        <div class="card-info"> 
                            <h1>{{card.title}}</h1>
                            <p class= "image-description"> {{card.description}} </p> 
                            <p class="image-info">Uploaded by {{card.username}} on {{card.created_at}}</p> 
                        </div>
                    </div>
                       
                    <comments-section></comments-section>
            </div>`,
};

export default bigCard;
