import storage from '@/models/storage.js'

const actions = {
    async uploadImage(_, payload) {
        try {
            return await storage.uploadFile(payload, "onlyImage", payload.name, "");
        } catch (err) {
            console.error("Error on uploading image ", err);
        }
    },
    // async uploadBase64(_,payload) {
    //     try{
    //         return await storage.base64(payload.data.imageBase64, payload.data.folder, "manifest")
    //     } catch(err) {
    //         console.error("Error on upload image base 64", err);
    //     }
    // },
    async getImage(_, payload) {
        try {
            return await storage.getDowloadUrl("onlyImage", payload.name, "");
        } catch (err) {
            console.error("Error on getting image ", err);
        }
    },
    async deleteImage(_, payload) {
        try {
            return await storage.deleteFile("onlyImage", payload.name, "");
        } catch (err) {
            console.error("Error on removing image ", err);
        }
    },
}

export default{
    actions
}
