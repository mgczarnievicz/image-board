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

    methods: {},
    //  new Date({{card.created_at}})
    template: `

                <div class="big-card card">
                    <img v-bind:src="card.url" :alt="card.title" v-bind:key="card.id" class="big-img">
                    <div class="card-info"> 
                        <h1>{{card.title}}</h1>
                        <p class="image-info">Uploaded by {{card.username}} on {{card.created_at}}</p> 
                        <p> {{card.description}} </p> 

                    </div>

                </div> `,
};

export default bigCard;
