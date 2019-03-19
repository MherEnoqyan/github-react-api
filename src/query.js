export default function getData(url, auth) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Authorization': 'Basic ' + auth
        }
    })
        .then(response => response.json());

}