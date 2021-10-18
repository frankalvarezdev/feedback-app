class LocalDB {
    constructor(name, version, objectStores) {
        this.dbname = name;
        this.dbversion = version;
        this.indexDB = window.indexedDB;
        this.db = null;
        this.objectStores = objectStores;
        this.data = {};
    }

    /**
     * Conecta a indexedDB
     */
    connect() {
        // conectamos a la base de datos
        this.conecction = this.indexDB.open(this.dbname, this.dbversion);

        // crea las colecciones
        this.conecction.onupgradeneeded = e => {
            let db = e.target.result;

            for (const store of this.objectStores) {
                db.createObjectStore(store.name, {
                    keyPath: store.key
                });
            }
        }

        // retorna true en cuando este se conecta -> Promise
        return new Promise((resolve, reject) => {
            this.conecction.onsuccess = () => {
                this.db = this.conecction.result;
                resolve(true);
            };
            this.conecction.onerror = error => reject(error);
        })
    }

    /**
     * agrega un dato a ala coleccion
     * @param {any} data datos, debe incluir la clave
     * @param {string} collectionName Nombre de la coleccion 
     */
    add(data, collectionName) {
        const transaction = this.db.transaction([collectionName], 'readwrite')
        const collection = transaction.objectStore(collectionName);
        const task = collection.add(data);

        return new Promise((resolve, reject) => {
            task.onsuccess = () => resolve(true);
            task.onerror = err => reject(err);
        })
    }

    /**
     * @param {number} key 
     * @param {string} collectionName 
     * @returns valor de la llave
     */
    get(key, collectionName) {
        const transaction = this.db.transaction([collectionName], 'readonly');
        const collection = transaction.objectStore(collectionName);
        const task = collection.get(key)

        return new Promise((resolve, reject) => {
            task.onsuccess = event => {
                resolve(event.target.result)
            }
            task.onerror = err => reject(err);
        })
    }
    setData(value, collectionName) {
        this.data[collectionName].push(value);
    }

    /**
     * @param {string} collectionName 
     * @returns datos de la coleccion
     */
    getCollection(collectionName) {
        const transaction = this.db.transaction([collectionName], 'readonly');
        const collection = transaction.objectStore(collectionName);
        const task = collection.openCursor();

        // inicializa el array para mostrar el resultado
        this.data[collectionName] = [];

        return new Promise((resolve, reject) => {
            task.onsuccess = event => {
                const cursor = event.target.result;

                if (cursor) {
                    this.setData(cursor.value, collectionName);
                    cursor.continue();
                } else { // si ya no hay mas registros resuelve la promesa
                    resolve(this.data[collectionName]);
                }
            }
            task.onerror = err => reject(err);
        })

    }
}

export default LocalDB;