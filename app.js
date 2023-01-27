const form = document.querySelector('#form');
const input = document.querySelector('#num');
const btn = document.querySelector('#btn');
const resalt = document.querySelector('#resalt');
const btnComments = document.querySelector('#btnComments');
const forComents = document.querySelector('#comments');

function getPost(numOfPost) {
    resalt.textContent = "";

    numOfPost = Number(numOfPost);

    if (Number.isNaN(numOfPost)) {
        resalt.textContent = "Incorrect data. Type a number please";
    } else {
        fetch(`https://jsonplaceholder.typicode.com/posts/${numOfPost}`)
            .then(response => {
                if (response.ok) {
                   return response.json()
                }
                throw new Error('Does not exist');
            })
            .then(data => {
                console.log(data);
                let title = data.title;
                let body = data.body;
               
                const titleDiv = document.createElement('h2');
                const bodyDiv = document.createElement('p');

                titleDiv.textContent = `${title}`;
                bodyDiv.textContent = `${body}`;

                resalt.append(titleDiv, bodyDiv);

                localStorage.setItem('commentsId', JSON.stringify(numOfPost));

                btnComments.removeAttribute('hidden');
                forComents.textContent = '';
                
            })
            .catch(() =>  resalt.textContent = "Does not exist" );
    }
}

function getComments(id) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Does not exist');
        })
        .then(comments => {

            comments.forEach(comment => {

                const container = document.createElement('div');
                const nameDiv = document.createElement('h4');
                const descriptionDiv = document.createElement('p');

                nameDiv.textContent = `${comment.name}`;
                descriptionDiv.textContent = `${comment.body}`;

                container.append(nameDiv, descriptionDiv);
                forComents.append(container);
            });
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    getPost(input.value);
    input.value = "";    
});

btnComments.addEventListener('click', (event) => {
    event.preventDefault();

    const commentsId = JSON.parse(localStorage.getItem('commentsId'));

    getComments(commentsId);
});