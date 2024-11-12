export async function fetchJson(file){

    const response = await fetch(file);
    const json = await response.json();

    return json;
}