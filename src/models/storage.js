import { storage } from "@/firebase"

export default{
    uploadFile: async (file, folder, name, extension) => {
        console.log(file, folder, name, extension);
        let ext = extension.length ? "." + extension : "";
        return await storage.ref().child(`${folder}/${name}${ext}`).put(file);
    },
    // base64: async (file, name, folder) => {
    //     for(let i=0; i < file.length; i++){
    //         console.log(file.length);
    //         (await storage).ref().child(`${folder}/${name[i]}`).putString(file[i], 'base64', {contentType:'image/png'})
    //     }
    // },
    getDowloadUrl: async (folder, name, extension) => {
        var storageRef = (await storage).ref();
        let ext = extension.length ? "." + extension : "";

        return storageRef.child(`${folder}/${name}${ext}`).getDownloadURL().then(url => {
            return url
        })
    },
    deleteFile: async (folder, name, extension) => {
        var storageRef = (await storage).ref();
        let ext = extension.length ? "." + extension : "";

        storageRef.child(`${folder}/${name}${ext}`).delete();
    }
}