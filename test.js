const { https } = require('follow-redirects');

class Iframe {
    constructor(url) {
        this.url = url;
    }
    verifyService() {
        if (/(youtube.com\/watch|youtu.be)/.test(this.url)) {
            this.service = 'YouTube';
        } else if (/(soundcloud.com|soundcloud.app)/.test(this.url)) {
            this.service = 'SoundCloud';
        } else if (/audiomack.com/.test(this.url)) {
            this.service = 'Audiomack';
        }
    }
    getRedirectUrl(url) {
        return new Promise((resolve, reject) => {
            const request = https.request(url, res => {
                resolve(res.responseUrl);
            }).on('error', (error) => {
                reject(error);
            });
            request.end();
        });
    }
    async getIframeUrl() {
        switch (this.service) {
            case 'YouTube':
                this.iframeUrl = this.youtube();
                break;
            case 'SoundCloud':
                this.iframeUrl = await this.soundcloud();
                break;
            case 'Audiomack':
                this.iframeUrl = this.audiomack();
                break;
            default:
                break;
        }
    }
    youtube() {
        // si el enlace contiene youtu.be
        if (/youtu.be/.test(this.url)) {
            return "https://www.youtube.com/embed/" + this.url.replace(/https?:\/\/youtu.be\//i, '');
        } else {
            return "https://www.youtube.com/embed/" + this.url.replace(/https?:\/\/(www.)?youtube.com\/watch\?v=/i, '');
        }
    }
    async soundcloud() {
        // obtiene la redireccion de la url
        if (/soundcloud.app/.test(this.url)) {
            this.url = await this.getRedirectUrl(this.url);
        }

        // elimina los parametros
        this.url = this.url.replace(/\?.*/, '');

        if (/https?:\/\/(.*)\/(.*)\/s-/.test(this.url)) { // si la url requiere de un token


            // obtiene solo la url
            let match = this.url.match(/https?:\/\/([a-z.])*\/([a-z-_0-9])*\/([a-z-_0-9])*/)[0];

            // obtiene el token
            let secretToken = this.url.replace(/https?:\/\/([a-z.])*\/([a-z-_0-9])*\/([a-z-_0-9])*\//, '');

            return `https://w.soundcloud.com/player/?url=${match}?secret_token=${secretToken}&color=%236461cd&visual=true`;

        } else {
            return `https://w.soundcloud.com/player/?url=${this.url}&color=%236461cd&visual=true`;
        }
    }
    audiomack() {
        this.url = this.url.replace(/\/song\//i, '/');
        return this.url.replace(/.com\//i, '.com/embed/song/') + '?background=1&color=7a77ff';
    }
    async get() {
        this.verifyService();
        await this.getIframeUrl();

        return { iframe: this.iframeUrl, service: this.service }
    }
}

const getIframeUrl = async (url) => {
    const iframe = new Iframe(url);
    const testurl = await iframe.get();
    console.log(testurl);
}