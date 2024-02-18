export default async function api(){
    return fetch('https://65d15239ab7beba3d5e449ae.mockapi.io/rate', {
        method: 'GET',
        headers: {'content-type':'application/json'}
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
})}