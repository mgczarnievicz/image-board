const bigCard = {
    data() {
        return {
            card: {},
            count: 1,
        };
    },
    props: ["idCard"],

    mounted() {
        // aca tengo que leer la base de datos!
        console.log("First component mounted");
        console.log("this.idCard", this.idCard);

        // {  new FormData
        //         method: "GET",
        //         body: new FormData(e.target),
        //     }

        fetch(`/getCard/${this.idCard}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Response form /getCard:", data);
                this.cards = data;
                console.log("this.cards", this.cards);
            })
            .catch(() => console.log("Error in /getCard"));
    },

    methods: {
        increaseCount() {
            console.log("Increase Count");
            console.log("idCard", idCard);
            this.count++;
        },
    },
    template: `<div class=bigCard>
                    <h1>Title {{card.title}}</h1>
                    
                    <img v-bind:src="card.url" :alt="card.title" v-bind:key="card.id" class="big-img">
                    <div class="card-info"> 
                        <p>Date: {{card.created_at}}</p> 
                        <p>User Name: {{card.username}}</p> 
                    </div>


                    <h2>count is: {{count}}</h2>
                    <button @click="increaseCount"> Increase Count</button>
                </div> `,
};

export default bigCard;
