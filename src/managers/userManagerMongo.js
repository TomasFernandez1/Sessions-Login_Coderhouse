import userModel from '../models/users.models.js';

export default class userManagerMongo {
    constructor() {}

    async getUsers(filters){
        return await userModel.find(filters)
    }

    async getUser(id){
        return await userModel.findById({_id: id}).lean()
    }

    async createUser(newUser){
        return await userModel.create(newUser)
    }

    async updateUser(id, updatedUser){
        return await userModel.findByIdAndUpdate({_id: id}, updatedUser)
    }

    async deleteUser(id){
        return await userModel.delete({_id: id})
    }
}