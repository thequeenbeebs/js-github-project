document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('github-form').addEventListener('submit', (event) => {
        event.preventDefault()
        if (event.target.type.value === "user") {
            userSearch(event.target.search.value)
        } else {
            repoSearch(event.target.search.value)
        }
        
        document.getElementById('github-form').reset() 
    })
})

function userSearch(input) {
    fetch(`https://api.github.com/search/users?q=${input}`)
        .then(resp => resp.json())
        .then(data => data.items.forEach(user => renderUser(user)))
}

function renderUser(user) {
    let userContainer = document.getElementById("user-list")

    let userLi = document.createElement('lio')

    let username = document.createElement('h3')
        username.innerText = user.login

    let avatar = document.createElement('img')
        avatar.src = user.avatar_url

    let br = document.createElement('br')
    let br2 = document.createElement('br')

    let link = document.createElement('a')
        link.href = user.html_url 
        link.innerText = "View Profile"
    
    userLi.append(username, avatar, br, br2, link)
    userContainer.append(userLi)

    userLi.addEventListener('click', () => fetchRepos(user.login))
}

function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(resp => resp.json())
        .then(repos => {
            document.getElementById('repos-list').innerHTML = ""
            repos.forEach(repo => renderRepo(repo))
        })
}

function renderRepo(repo) {
    let repoContainer = document.getElementById('repos-list')

    let repoLi = document.createElement('li')

    let repoLink = document.createElement('a')
        repoLink.href = repo.html_url
        repoLink.innerText = repo.name 
    
    repoLi.append(repoLink)

    repoContainer.append(repoLi)
}

function repoSearch(input) {
    fetch(`https://api.github.com/search/repositories?q=${input}`)
        .then(resp => resp.json())
        .then(data => data.items.forEach(repo => renderRepo(repo)))
}

