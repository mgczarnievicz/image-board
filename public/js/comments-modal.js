const commentsModal = {
    data() {
        return {
            oldComments: [],

            comment: "",
            user: "",
        };
    },

    props: ["cardIdForComment"],

    watch: {
        cardIdForComment: function () {
            console.log(
                "cardIdForComment was update!!!! I am listen to u!",
                this.cardIdForComment
            );
            fetch(`/getComments/${this.cardIdForComment}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("Response form /getComments:", data);
                    this.oldComments = data;
                })
                .catch(() => console.log("Error in /getComments"));
        },
    },

    mounted() {
        console.log("First component mounted");
        console.log("this.cardIdForComment", this.cardIdForComment);

        fetch(`/getComments/${this.cardIdForComment}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Response form /getComments:", data);
                this.oldComments = data;
            })
            .catch(() => console.log("Error in /getComments"));
    },

    methods: {
        handleSubmit(e) {
            // We can put it here or in the html
            e.preventDefault();
            console.log("I am handling the submit");
            console.log(
                `User: ${this.user} \nComment: ${this.comment} \nId: ${this.cardIdForComment}`
            );

            fetch("/addComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: this.user,
                    comment: this.comment,
                    cardId: this.cardIdForComment,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        // manage the error
                    }
                    // I clean the Inputs
                    this.user = "";
                    this.comment = "";

                    console.log("data addComment", data);
                    // we must push to the array
                    this.oldComments.push(...data);

                    // console.log(data.image);
                    // console.log("this.cards.length", this.cards.length);
                })
                .catch();
        },
    },

    /* 

    */
    // <label for="comment">Comment:</label> v-if="oldComments.length"
    // v-model="user" user is the name in our data object define up.
    template: `<div class="comment-section">
                    <h1>Comments:</h1>
                    <div class="old-comments">
                        <div v-for="comment in oldComments"   class="comment-card " >
                           
                                <p>{{comment.comment}}</p> 
                                <p class="image-info">By: {{comment.username}} {{comment.created_at}}</p>
                        
                        </div>
                    </div>


                    <form  @submit.prevent()="handleSubmit" class="form-comment form">

                        <input v-model="user" type="text" name="user" placeholder="User *" class="input-text" required />
                        <textarea v-model="comment" id="comment" name="comment" rows="5" cols="33" placeholder="Add your comment"></textarea>

                        <button type="submit" class="form-button ">submit</button>
                    </form>


                </div> `,
};
//  .mount("#main")
export default commentsModal;
