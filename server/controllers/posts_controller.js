let posts = [
    {id: 1, post: "Wow, this project is a lot harder than I thought"},
    {id: 2, post: "Man, I keep getting errors every time I try something"},
]

let id = 3;

module.exports = {
    read: (req, res) => {
        res.status(200).send(posts);    
    },
    create: (req, res) => {
        const {post} = req.body
        let postList = {
            id: id, 
            post: post,
        }
        id++
        posts.push(postList)
        res.status(200).send(posts);
    },
    update: (req, res) => {
        let index = null;
        posts.forEach((post, i) => {
            if(post.id === Number(req.params.id)) index = i;
        })

        posts[index] = {
            id: posts[index].id,
            post: req.body.text || posts[index].post,
        }
        console.log(posts[index], index)
        res.status(200).send(posts);
    },
    delete: (req, res) => {
        let index = null;
        posts.forEach((post, i) => {
          if(post.id === Number(req.params.id)) index = i;
        })
        posts.splice(index, 1)
        res.status(200).send(posts);
    }
}