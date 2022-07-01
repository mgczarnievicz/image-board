const firstComponent = {
    data() {
        return {
            heading: "first component",
            count: 1,
            greet: "",
        };
    },
    mounted() {
        console.log("First component mounted");
        setTimeout(() => {
            this.greet = "Cayenne";
        });
    },

    methods: {
        increaseCount() {
            console.log("Increase Count");
            this.count++;
        },
    },
    template: `<div>
                    <h1>I am your {{heading}}</h1>
                    <h2>Hello {{greet}}</h2>
                    <h2>count is: {{count}}</h2>
                    <button @click="increaseCount"> Increase Count</button>
                </div> `,
};

export default firstComponent;
