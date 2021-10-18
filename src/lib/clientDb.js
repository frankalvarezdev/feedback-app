import LocalDB from "./LocalDB";

const conectToLocalDb = async () => {
    const localdb = new LocalDB('feedbackdb', 1, [{ name: 'tracks', key: 'id' }]);
    await localdb.connect();

    return localdb;
}

/**
 * @param {number} id 
 */
const addListenedTrack = async id => {
    // comprueba si se agrego o no a tracks escuchados
    const verify = await checkListenedTrack(id);

    if (!verify) {
        const localdb = await conectToLocalDb();
        return await localdb.add({ id, time: Date.now() }, 'tracks');
    } else {
        return false;
    }
}

const checkListenedTrack = async id => {
    
    const localdb = await conectToLocalDb();
    const listened = await localdb.get(id, 'tracks');

    return typeof listened !== 'undefined';
}

/**
 * @returns {Promise<Array>} tracks escuchados
 */
const getListenedTracks = async () => {
    const localdb = await conectToLocalDb();
    return await localdb.getCollection('tracks');
}

const checkListenedTracks = async (data) => {

    let tracks = [];

    const tracksListened = await getListenedTracks();

    // comprueba que tracks ya fueron escuchados
    for (const track of data.data) {
        const listened = typeof tracksListened.find(t => t.id === track.id) !== 'undefined';
        tracks.push({ ...track, listened })
    }

    data.data = tracks;

    return data;
}

export { getListenedTracks, addListenedTrack, checkListenedTrack, checkListenedTracks };